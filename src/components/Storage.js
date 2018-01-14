import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";
import Items from "./Items"


export const testItems = {
			item: [{"item_id":"1","name":"veitsi","serial_number":"123123"},
				{"item_id":"2","name":"puukko","serial_number":"123124"},
				{"item_id":"3","name":"lihaveitsi","serial_number":"123124"},
			]
		};


class Storage extends Component{
	constructor (props){
		super(props)
		this.state = {
			items: testItems
		}
	}

	

	render(){
		
		return(
			<div>
				<Menu />

				<Items items={this.state.items}/>
			</div>
		);
	}

}
export default Storage;
