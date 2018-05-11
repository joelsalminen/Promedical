import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";


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

	}

	nameChangeHandler(evt){
		this.setState({itemName: evt.target.value});
	}

	serialChangeHandler(evt){
		this.setState({serial: evt.target.value});
	}

	render(){
		return(

		<div>
			<Menu />
			<h1>Lisää tuote</h1>

			<p>{this.state.serial}</p>
			<button id="scan_button">Skannaa</button>
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
