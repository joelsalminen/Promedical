import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";


class AddItem extends Component{
	constructor(props){
		super(props);
		this.state = {
			itemName: ""
		};
		this.submitClickHandler = this.submitClickHandler.bind(this);
		this.nameChangeHandler = this.nameChangeHandler.bind(this);
	}

	submitClickHandler(){

	}

	nameChangeHandler(evt){
		this.setState({itemName: evt.target.value});
	}

	render(){
		return(

		<div>
			<Menu />
			<h1>Lisää tuote</h1>


			<button id="scan_button">Skannaa</button>
			<p>Tuote</p>

			<input name="name" placeholder="Tuotteen nimi" onChange={this.nameChangeHandler}/>
			<p>Sarjanumero</p>

			<input name="serial_number" placeholder="Sarjanumero" />
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
