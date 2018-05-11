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
		this.returnItem = this.returnItem.bind(this);
		this.filterItems = this.filterItems.bind(this);
		this.suggestionClickHandler = this.suggestionClickHandler.bind(this);
	}


	serialChangeHandler (evt){
		this.setState({serial: evt.target.value });
	}

	returnItem(){
		console.log("Serial number sent to backend");
	}

	componentDidMount(){
		$.ajax({
			url: '/api/items',
			method: 'get',
			success: (res)=>{this.setState({items: res})}
		});
		
	}

	suggestionClickHandler(item){
		let list = this.state.toReturn;
		list.push(item.name);
		this.setState({
			toReturn: list
		});
	}


	filterItems(items) {
		
		//items = items.item.slice();
		items = items.filter((item) => item.serial.toString().indexOf(this.state.serial) !== -1);

		//items = items.filter(item => item.name.indexOf(this.state.nameSearch)!== -1);
		if (this.state.serial === ""){
			return [];	
		}
		return items;
	}

	render(){
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
				{this.state.toReturn.map((item, index)=><li key={index}>{item}</li>)}
			</ul>
			<br/>
			<br/>
			<button className="SubmitButton" onClick={this.returnItem}>Palauta</button>

			
		</div>);
	}

}
export default Return;
