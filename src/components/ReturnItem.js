import Menu from "./MainComponents/MainMenuButton";
import React, { Component } from 'react';
import SuggestionList from './MainComponents/SuggestionList'
import $ from 'jquery';


class Return extends Component{
	constructor(props){
		super(props);

		this.state = {
			serial: "",
			items: [],
			toReturn: []
		}

		this.serialChangeHandler = this.serialChangeHandler.bind(this);	
		this.suggestionClickHandler = this.suggestionClickHandler.bind(this);

		this.returnItemButtonHandler = this.returnItemButtonHandler.bind(this);
		this.filterItems = this.filterItems.bind(this);
	}

	/* Fired whenever Serial field data changes */
	serialChangeHandler (evt){
		this.setState({serial: evt.target.value });
	}

	/* Fired whenever Suggestion button is clicked */
	suggestionClickHandler(item){
		let list = this.state.toReturn;
		list.push(item);
		this.setState({
			toReturn: list
		});
	}

	/* Documents that a item was returned to storage */
	returnItemButtonHandler(){

		/* Goes through the list of all items in toReturn state*/
		this.state.toReturn.forEach((item) => {

			/* Ajax call that adds an item back to Items */
			$.ajax({
				url: '/api/items/',
				method: 'post',
				data: {

				},

				success: ((res)=>{
					//console.log(res);
					/* Ajax call that removes lending */


					/* Reset toReturn state to an empty array */
					this.setState({
						toReturn: []
					});

				})

			});

		});

	}


	componentDidMount(){
		/* Fetch lending data from database */
		$.ajax({
			url: '/api/lendings',
			method: 'get',
			success: (lendings)=>{
				let items = [];
				lendings.forEach((lending)=>{
					items.push(lending.item);
				});
				this.setState({items: items});
				
			}
		});
		
	}

	/* Filters items on a list based input data of Lend Item Name */
	filterItems(items) {
		/* filter out serial numbers that don't include the same data as this.state.serial */
		items = items.filter((item) => item.serial.toString().indexOf(this.state.serial) !== -1);

		/* The list of items is only shown when some input typed into Lend Item Name field*/
		if (this.state.serial === ""){
			return [];	
		}
		return items;
	}

	render(){
		/* Filter items based on Lend Item Name field input */
		let itemsList = this.filterItems(this.state.items);
		
		return(
		<div>
			<Menu />
			<h1>Palautus</h1>

			
			<p>Sarjanumero:</p>
			<input name="serial_number" type="text" placeholder="serial number" onChange={this.serialChangeHandler}/>
			<ul>
				{itemsList.map((item, index)=> <SuggestionList item={item} key={index} clickAction={this.suggestionClickHandler}/> )}
			</ul>

			<p>---------------------------------------------</p>
			<ul>
				{this.state.toReturn.map((item, index)=><li key={index}>{item.name}</li>)}
			</ul>
			<br/>
			<br/>
			<button className="SubmitButton" onClick={this.returnItemButtonHandler}>Palauta</button>

			
		</div>);
	}

}
export default Return;

/* Joel Salminen - joel.salminen@student.fi */ 