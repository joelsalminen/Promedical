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

		this.returnItem = this.returnItem.bind(this);
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
	returnItem(){

		/* Go through all items in toReturn */
		this.state.toReturn.forEach((item) => {
			item.location = "varasto";
			item.expiration = "";

			/* Ajax call that edits Item data */
			$.ajax({
				url: '/api/items/' + item._id,
				method: 'put',
				data: {
					'expiration': "",
					'location': "varasto"
				},
				success: ((res)=>console.log(res))
			});

		});


		

		/* Reset toReturn */
		/* this should be inside success: (), in ajax call*/
		this.setState({
			toReturn: []
		});
	}


	componentDidMount(){
		/* Fetch item data from database */
		$.ajax({
			url: '/api/items',
			method: 'get',
			success: (res)=>{this.setState({items: res})}
		});
		
	}

	/* Filters items on a list based input data of Lend Item Name */
	filterItems(items) {
		
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
			<button className="SubmitButton" onClick={this.returnItem}>Palauta</button>

			
		</div>);
	}

}
export default Return;

/* Joel Salminen - joel.salminen@student.fi */ 