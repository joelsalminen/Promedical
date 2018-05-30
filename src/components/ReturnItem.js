import Menu from "./MainComponents/MainMenuButton";
import React, { Component } from 'react';
import SuggestionList from './ReturnComponents/ReturnSuggestionList'
import $ from 'jquery';


class Return extends Component{
	constructor(props){
		super(props);

		this.state = {
			serial: "",
			items: [],
			toReturn: []
		}

		this.filterItems = this.filterItems.bind(this);

		this.onSerialChange = this.onSerialChange.bind(this);	
		this.onSuggestionClick = this.onSuggestionClick.bind(this);
		this.onReturnItemClick = this.onReturnItemClick.bind(this);
		
	}


	componentDidMount(){
		/* Fetch lending data from database */
		$.ajax({
			url: '/api/lendings',
			method: 'get',
      headers: {
        'Authorization': localStorage.getItem('token')
      },
			success: (lendings)=>{
				this.setState({items: lendings});
			}
		});
		
	}


	/* Filters items on a list based input data of Lend Item Name */
	filterItems(items) {
		/* filter out serial numbers that don't include the same data as this.state.serial */
		items = items.filter((item) => item.item.serial.toString().indexOf(this.state.serial) !== -1);

		/* The list of items is only shown when some input typed into Lend Item Name field*/
		if (this.state.serial === ""){
			return [];	
		}
		return items;
	}


	/* Fired whenever Serial field data changes */
	onSerialChange (evt){
		this.setState({serial: evt.target.value });
	}

	/* Fired whenever Suggestion button is clicked */
	onSuggestionClick(itemToReturn){
		/* Add item to toReturn state */
		let toReturn = this.state.toReturn.map(item => Object.assign({}, item));
		toReturn.push(itemToReturn);
		this.setState({toReturn});

		/* Remove item from items state */
		let items = this.state.items.map(item => Object.assign({}, item));
		items = items.filter(item => {
			return item._id !== itemToReturn._id;
		});

		this.setState({items});
	}


	/* Documents that a item was returned to storage */
	onReturnItemClick(){
		/* Goes through the list of all items in toReturn state*/
		this.state.toReturn.forEach((item) => {
			//console.log(item);
			let itemData = item.item;

			/* Ajax call that adds an item back to Items */
			$.ajax({
				url: '/api/items/',
				method: 'post',
	      headers: {
	        'Authorization': localStorage.getItem('token')
	      },
				data: itemData,

				success: ((res)=>{
					/* Ajax call that removes a lending */
					$.ajax({
						url: '/api/lendings/' + item._id,
						method: 'delete',
			      headers: {
			        'Authorization': localStorage.getItem('token')
			      },
						success: ((res)=>{
							console.log(res);
							/* Reset toReturn state to an empty array */
							this.setState({
								toReturn: []
							});
						})
					});
				})

			});

		});
	}


	render(){
		/* Filter items based on Lend Item Name field input */
		let itemsList = this.filterItems(this.state.items);
		
		return(
		<div>
			<Menu />
			<h1>Palautus</h1>

			
			<p>Sarjanumero:</p>
			<input name="serial_number" type="text" placeholder="serial number" onChange={this.onSerialChange}/>
			<ul>
				{itemsList.map((item, index)=> <SuggestionList item={item} key={index} clickAction={this.onSuggestionClick}/> )}
			</ul>

			<p>---------------------------------------------</p>
			<ul>
				{this.state.toReturn.map((item, index)=><li key={index}>{item.item.name}</li>)}
			</ul>
			<br/>
			<br/>
			<button className="SubmitButton" onClick={this.onReturnItemClick}>Palauta</button>

			
		</div>);
	}

}
export default Return;

/* Joel Salminen - joel.salminen@student.fi */ 