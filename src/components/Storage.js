import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";
import Items from "./Items"


export const testItems = {
			item: [{"item_id":"1","name":"veitsi","serial_number":"100", "location":"varasto", "expiration":"2018-01-13"},
				{"item_id":"2","name":"puukko","serial_number":"101", "location":"varasto", "expiration":"2018-01-12"},
				{"item_id":"3","name":"lihaveitsi","serial_number":"102", "location":"varasto", "expiration":"2018-01-15"},
				{"item_id":"4","name":"kirurginen veitsi","serial_number":"103", "location":"varasto", "expiration":"2018-01-15"},
				{"item_id":"5","name":"vihannesveitsi","serial_number":"104", "location":"varasto", "expiration":"2018-01-15"},
				{"item_id":"6","name":"mattoveitsi","serial_number":"105", "location":"varasto", "expiration":"2018-01-15"},
				{"item_id":"7","name":"kirves","serial_number":"106", "location":"varasto", "expiration":"2018-01-15"},
				{"item_id":"8","name":"kirurginen veitsi","serial_number":"107", "location":"Asiakas 1", "expiration":"2018-01-15"},
				{"item_id":"9","name":"puukko","serial_number":"108", "location":"Asiakas 1", "expiration":"2018-01-15"},
				{"item_id":"10","name":"lihaveitsi","serial_number":"109", "location":"Asiakas 2", "expiration":"2018-01-15"},
				{"item_id":"11","name":"lihaveitsi","serial_number":"110", "location":"Asiakas 2", "expiration":"2018-01-15"},
				{"item_id":"12", "name":"kynsiviila","serial_number":"111", "location":"Asiakas 3", "expiration":"2018-01-15"},
				{"item_id":"13","name":"sakset","serial_number":"112", "location":"Asiakas 4", "expiration":"2018-01-15"},
				{"item_id":"14","name":"sakset","serial_number":"113", "location":"Asiakas 4", "expiration":"2018-01-15"},

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
