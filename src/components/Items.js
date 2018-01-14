import React, { Component } from 'react';

class Items extends Component{
	constructor(props){
		super(props)
		this.state = {
			nameSearch: "",
			serialSearch: ""
		}

		this.setNameSearch = this.setNameSearch.bind(this);
		this.setSerialSearch = this.setSerialSearch.bind(this);
		this.filterItems = this.filterItems.bind(this);
	}

	filterItems(items) {

		/* Filtering items by name */
		items = items.filter(item => item.name.indexOf(this.state.nameSearch)!== -1);

		/* Filtering items by serial number */
		items = items.filter(item => item.serial_number.indexOf(this.state.serialSearch)!== -1);

		/* Filtering items by location */
		items = items.filter(item => item.location.indexOf("varasto") !== -1)

		return items;
	}


	setNameSearch(evt){
		this.setState({nameSearch: evt.target.value})
	}

	setSerialSearch(evt){
		this.setState({serialSearch: evt.target.value})
	}


	

	render(){
		let items = this.props.items.item.slice();
		items = this.filterItems(items);

		return (
			<div>
				<input placeholder="tuotteen nimi" onChange={this.setNameSearch} value={this.state.nameSearch}></input>
				<input placeholder="sarjanumero" onChange={this.setSerialSearch} value={this.state.setSerialSearch}></input>
				<input type="checkbox" name="inStorage" checked/>
				<label htmlFor='inStorage'>Varastossa</label>
				<input type="checkbox" name="withCustomer" checked />
				<label htmlFor='withCustomer'>Asiakkaalla</label>


				<ul>
					{items.map(item =><li key={item.item_id}>{item.name} {item.serial_number} - {item.location}</li>)}

				</ul>
			</div>
		);
	}
	
}


export default Items;