import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";


class AddItem extends Component{
	constructor(props){
		super(props);
		this.submitClickHandler = this.submitClickHandler.bind(this);
	}

	submitClickHandler(){
		console.log('submit button action');
	}


	render(){
		return(

		<div>
			<Menu />
			<h1>Lisää tuote</h1>

			<button id="scan_button">Skannaa</button>
			<p>Tuote</p>

			<input name="name" placeholder="Tuotteen nimi" />
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
