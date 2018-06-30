import Menu from "./MainComponents/MainMenuButton";
import React, { Component } from 'react';
import SuggestionList from './ReturnComponents/ReturnSuggestionList'
import $ from 'jquery';

import './ReturnItem.css'


class Return extends Component{
	constructor(props){
		super(props);

		this.state = {
			serial: "",
			items: [],
			toReturn: [],
			showList: true
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
	filterItems() {
		const { items, serial } = this.state;
		let itemsList
		/* filter out items that don't include the same data as this.state.serial */
		itemsList = items.filter((item) => {
			const data = item.item.serial.toString() + item.item.name;
			return data.indexOf(serial) !== -1
		});

		return itemsList;
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
		this.state.toReturn.forEach((lending) => {

			let itemData = lending.item;
			console.log(itemData);

			/* Ajax call that adds an item back to Items */
			$.ajax({
				url: '/api/items/',
				method: 'post',
	      headers: {
	        'Authorization': localStorage.getItem('token')
	      },
				data: {
					name: itemData.name,
					serial: itemData.serial
				},

				success: ((res)=>{
					/* Ajax call that removes a lending */
					$.ajax({
						url: '/api/lendings/' + lending._id,
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
				}),
				error: (err)=>{
					console.log(err);
				}

			});

		});
	}

	onSuggestionButtonClick = () => {
		this.setState(prevState => ({
			showList: !prevState.showList
		}));
	}


	render(){

		const { showList } = this.state;
		/* Filter items based on Lend Item Name field input */
		const itemsList = this.filterItems();
		
		return(
		<div className="ReturnItem">
			<Menu />
			<h1 className="PageHeader">Palautus</h1>




			<div className="inputFields">
				<p>Sarjanumero:</p>
				<input name="serial_number" type="text" placeholder="serial number" onChange={this.onSerialChange}/>
			</div>


			<div className="suggestionButton__container">
				<button 
					className="SuggestionItem__suggestionButton"
					onClick={this.onSuggestionButtonClick}
				>
					{showList ? 'Piilota': 'Näytä'}
				</button>
			</div>

			{showList && 
				<ul className="ReturnItem__list">
					{itemsList.map((item, index)=> <SuggestionList item={item} key={index} clickAction={this.onSuggestionClick}/> )}
				</ul>
			}



			<ul>
				{this.state.toReturn.map((item, index)=><li key={index}>{item.item.name}</li>)}
			</ul>
			<button className="bottomButton" onClick={this.onReturnItemClick}>Palauta</button>

			
		</div>);
	}

}
export default Return;

/* Joel Salminen - joel.salminen@student.fi */ 