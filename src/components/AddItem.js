import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";
import $ from "jquery";

class AddItem extends Component{

	constructor(props){
		super(props);
		this.state = {
			itemName: "",
			serial: "",
		};


		this.submitClickHandler = this.submitClickHandler.bind(this);
		this.nameChangeHandler = this.nameChangeHandler.bind(this);
		this.serialChangeHandler = this.serialChangeHandler.bind(this);
	}

	submitClickHandler(){

		let itemData = {
			name: this.state.itemName,
			serial: this.state.serial,
			location: "varasto",
			expiration: ""
		};
		
		let request = $.ajax({
			url: '/api/items',
			method: 'post',
			data: itemData, 
		});
		request.done((res)=>{console.log(res)});
	}

	nameChangeHandler(evt){
		this.setState({itemName: evt.target.value});
	}

	serialChangeHandler(evt){
		this.setState({serial: evt.target.value});
	}

	componentDidMount(){
		$.ajax({
			url: 'api/items',
			method: 'get',
			success: (res)=>{console.log(res)}
		});



	}

	render(){
		return(

		<div>
			<Menu />
			<h1>Lisää tuote</h1>

			<button className="ScanButton">Skannaa</button>
			<p>Tuote</p>

			<input name="name" placeholder="Tuotteen nimi" onChange={this.nameChangeHandler}/>
			<p>Sarjanumero</p>

			<input name="serial_number" placeholder="Sarjanumero" onChange={this.serialChangeHandler}/>
			<p>Lukumäärä</p>

			<input name="amount" placeholder="Lukumäärä" />
			

			<br/>
			<br/>
			<button className="SubmitButton" onClick={this.submitClickHandler}>Lisää</button>
			
			
		</div>
		);
	}

}
export default AddItem;
