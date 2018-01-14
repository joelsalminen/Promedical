import React, { Component } from 'react';

class Items extends Component{
	constructor(props){
		super(props)
		this.state = {
			nameSearch: "",
			serialSearch: "",
			inStorage: true,
			notInStorage: true
		}

		this.setNameSearch = this.setNameSearch.bind(this);
		this.setSerialSearch = this.setSerialSearch.bind(this);
		this.filterItems = this.filterItems.bind(this);
		this.inStorageCheckBoxChange = this.inStorageCheckBoxChange.bind(this);
		this.notInStorageCheckBoxChange = this.notInStorageCheckBoxChange.bind(this);
	}


	filterItems(items) {

		/* Filtering items by name */
		items = items.filter(item => item.name.indexOf(this.state.nameSearch)!== -1);

		/* Filtering items by serial number */
		items = items.filter(item => item.serial_number.indexOf(this.state.serialSearch)!== -1);

		/* Filtering items by location */
		if (this.state.inStorage === false){
			items = items.filter(item => item.location.indexOf("varasto")=== -1);
		}
		if (this.state.notInStorage === false){
			items = items.filter(item => item.location.indexOf("varasto")!== -1);
		}


		return items;
	}


	setNameSearch(evt){
		this.setState({nameSearch: evt.target.value})
	}

	setSerialSearch(evt){
		this.setState({serialSearch: evt.target.value})
	}


	inStorageCheckBoxChange(evt){
		if (this.state.inStorage === true){
			this.setState({inStorage: false})
		}

		else{
			this.setState({inStorage: true})
		}
	}


	notInStorageCheckBoxChange(evt){
		if (this.state.notInStorage === true){
			this.setState({notInStorage: false})
		}

		else{
			this.setState({notInStorage: true})
		}
	}


	render(){
		let items = this.props.items.item.slice();
		items = this.filterItems(items);

		return (
			<div>
				<input placeholder="tuotteen nimi" onChange={this.setNameSearch} value={this.state.nameSearch}></input>
				<input placeholder="sarjanumero" onChange={this.setSerialSearch} value={this.state.setSerialSearch}></input>

				<input type="checkbox" name="inStorage" onChange={this.inStorageCheckBoxChange} defaultChecked={this.state.inStorage} />
				<label htmlFor='inStorage'>Varastossa</label>

				<input type="checkbox" name="notInStorage" onChange={this.notInStorageCheckBoxChange} defaultChecked={this.state.notInStorage} />
				<label htmlFor='notInStorage'>Asiakkaalla</label>


				<ul>
					{items.map(item =><li key={item.item_id}>{item.name} {item.serial_number} - {item.location}</li>)}

				</ul>
			</div>
		);
	}
	
}


export default Items;