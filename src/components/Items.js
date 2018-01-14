import React, { Component } from 'react';

class Items extends Component{
	constructor(props){
		super(props)
		this.state = {
			state1: "state"
		}
	}

	render(){
		let items = this.props.items.item.slice();


		return (
			<div>
				<ul>
					{items.map(item =>
            <li key={item.item_id}>{item.name}</li>
          )}

				</ul>
			</div>
		);
	}
	
}


export default Items;