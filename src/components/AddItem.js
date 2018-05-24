import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";
import $ from "jquery";

/* Sends item data to backend to be stored in a database */
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
		/* Assemble data to sent */
		let itemData = {
			name: this.state.itemName,
			serial: this.state.serial,
		};
		
		/* Send assembled data to backend API using AJAX */
		$.ajax({
			url: '/api/items',
			method: 'post',
			data: itemData,
			success: ((res)=>{console.log(res)})
		});
		
	}

	/* Fired whenever the value of Name field changes */
	nameChangeHandler(evt){
		this.setState({itemName: evt.target.value});
	}

	/* Fired whenever the value of serial field changes*/
	serialChangeHandler(evt){
		this.setState({serial: evt.target.value});
	}


	render(){
		return(

			<div>
				<Menu />
				<h1>Lisää tuote</h1>

				{/* <button className="ScanButton">Skannaa</button>*/}

				<p>Tuotteen nimi:</p>
				<input name="name" placeholder="Tuotteen nimi" onChange={this.nameChangeHandler}/>
				
				<p>Sarjanumero:</p>
				<input name="serial_number" placeholder="Sarjanumero" onChange={this.serialChangeHandler}/>
				
				{/*
				<p>Lukumäärä:</p>
				<input name="amount" placeholder="Lukumäärä" />
				*/}
				

				<br/>
				<br/>
				<button className="SubmitButton" onClick={this.submitClickHandler}>Lisää tuote</button>
				
				
			</div>
		);
	}

}
export default AddItem;

/* Joel Salminen - joel.salminen@student.lut.fi */