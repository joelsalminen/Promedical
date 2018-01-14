import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";


class AddItem extends Component{
	
	render(){
		return(

		<div>
			<Menu />
			<button id="scan_button">Skannaa</button>
			<input name="name" placeholder="Tuotteen nimi" />
			<input name="serial_number" placeholder="Sarjanumero" />
			<input name="amount" placeholder="Lukumäärä" />
			<button>Lisää</button>
			
			
		</div>
		);
	}

}
export default AddItem;
