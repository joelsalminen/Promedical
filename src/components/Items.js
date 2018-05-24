import React, { Component } from 'react';
import $ from 'jquery';
import StorageListItem from './StorageComponents/StorageListItem';

class Items extends Component{
	constructor(props){
		super(props)
		this.state = {
			nameSearch: "",
			serialSearch: "",
			inStorage: true,
			notInStorage: true,
			showExpired: true,
			items: [],
			lendings: [],
		}

		this.parseLendings = this.parseLendings.bind(this);
		this.parseItems = this.parseItems.bind(this);
		this.setNameSearch = this.setNameSearch.bind(this);
		this.setSerialSearch = this.setSerialSearch.bind(this);
		this.filterItems = this.filterItems.bind(this);
		this.inStorageCheckBoxChange = this.inStorageCheckBoxChange.bind(this);
		this.notInStorageCheckBoxChange = this.notInStorageCheckBoxChange.bind(this);
		this.expiredChange = this.expiredChange.bind(this);
		this.checkExpirationDate = this.checkExpirationDate.bind(this);
	}

	// parses the lendings data in a way that it can be used in the item list
	parseLendings(lendings){
		let lentItems = [];

		lendings.forEach((lending)=>{

			let item = {};
			item.inStorage = false;
			item.serial = lending.item.serial;
			item._id = lending.item._id;
			item.name = lending.item.name;
			item.lender = lendings.lender;
			item.customer = lending.customer;
			item.startDate = lending.startDate;
			item.returnDate = lending.returnDate;
			item.lendType = lending.lendType;
			item.price = lending.price;

			lentItems.push(item);
		});
		return lentItems;
	}

	// parses item data for later usage
	parseItems(items){
		items.forEach((item)=>{
			item.inStorage = true;
		});
	}



	componentDidMount(){
		// get items data
		$.ajax({
			url: 'api/items',
			method: 'get',
			success: (res)=>{
				this.setState({items: res});
				this.parseItems(res);
			}
		});

	 // get lendings data
	 $.ajax({
	 	url: 'api/lendings',
	 	method: 'get', 
	 	success: (res)=>{
	 		//this.setState({lendings: res});
	 		let items = this.state.items;
	 		let lentItems = this.parseLendings(res);
	 		
	 		items.push(...lentItems);
	 		this.setState({items: items});
	 	}
	 });

	}


	checkExpirationDate(date){

		if (date === ""){
			return 0;
		}


		/* fetching the current date */
		const current = new Date();
		const currentYear = current.getUTCFullYear();
		const currentMonth = current.getUTCMonth() + 1;
		const currentDay = current.getUTCDate();
		const currentDate = new Date(currentYear, currentMonth, currentDay, 0, 0, 0);

		/* parsing the expiration date data*/
		console.log(date);
		let exp = date.split("-");
		exp[0] = parseInt(exp[0], 10);
		exp[1] = parseInt(exp[1], 10);
		exp[2] = parseInt(exp[2], 10);
		const expirationDate = new Date(exp[0], exp[1], exp[2], 0, 0, 0);


		/* returns -1 if the expiration date has been passed */
		if (currentDate.getTime() >= expirationDate.getTime()){
			return (-1);
		}
		else{
			return 0;
		}

	}

	filterItems(items) {

		/* Filtering items by name */
		items = items.filter(item => item.name.indexOf(this.state.nameSearch)!== -1);

		/* Filtering items by serial number */
		//items = items.filter(item => item.serial.indexOf(this.state.serialSearch)!== -1);

		/* Filtering items by location */
		if (this.state.inStorage === false){
			items = items.filter(item => item.location.indexOf("varasto")=== -1);
		}
		if (this.state.notInStorage === false){
			items = items.filter(item => item.location.indexOf("varasto")!== -1);
		}

		/* Filtering items by expiration */
		if (this.state.showExpired === false){
			//items = items.filter(item => this.checkExpirationDate(item.expiration) !== -1);
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

	expiredChange(evt){
		if (this.state.showExpired === true){
			this.setState({showExpired: false})
		}

		else{
			this.setState({showExpired: true})
		}
	}


	render(){

		let items = this.state.items;
		if (items !== {}){
			//items = items.item.slice();

			//items = this.filterItems(items);
		}
		
		
		return (
			<div>
				<h1>Varasto</h1>
				<input placeholder="tuotteen nimi" onChange={this.setNameSearch} value={this.state.nameSearch}></input>
				<input placeholder="sarjanumero" onChange={this.setSerialSearch} value={this.state.setSerialSearch}></input>

				<div>
					<input type="checkbox" name="inStorage" onChange={this.inStorageCheckBoxChange} defaultChecked={this.state.inStorage} />
					<label htmlFor='inStorage'>Varastossa</label>

					<input type="checkbox" name="notInStorage" onChange={this.notInStorageCheckBoxChange} defaultChecked={this.state.notInStorage} />
					<label htmlFor='notInStorage'>Asiakkaalla</label>

					<input type="checkbox" name="expired" onChange={this.expiredChange} defaultChecked={this.state.expired} />
					<label htmlFor='expired'>Erääntyneet tuotteet</label>
				</div>

				<ul id="StorageList">
					<li>NIMI - SARJANUMERO - SIJAINTI - ERÄPÄIVÄ</li>
					{items.map((item, index) => <StorageListItem key={index} item={item}/> )}

				</ul>




			</div>
		);
	}
	
}


export default Items;