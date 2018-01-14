import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";

class Storage extends Component{
	constructor (props){
		super(props)
		this.state = {
			state1: 1
		}
	}

	


	render(){
		const testItems = {
			item: [{"item_id":"1","name":"veitsi","serial_number":"123123"},
				{"item_id":"2","name":"puukko","serial_number":"123124"},
				{"item_id":"3","name":"mora","serial_number":"123124"},
			]
		};
		return(
			<div>
				<Menu />
				<ul>
					{testItems.item.map(item =>
            <li key={item.item_id}>{item.name}</li>
          )}

				</ul>
			</div>
		);
	}

}
export default Storage;
