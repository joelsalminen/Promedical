import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";
import Items from "./Items"

/* This is actually a useless middle piece, will be removed in the future */
class Storage extends Component{

	render(){

		return(
			<div>
				<Menu />

				<Items />

			</div>
		);
	}

}
export default Storage;

/* Joel Salminen - joel.salminen@student.lut.fi */