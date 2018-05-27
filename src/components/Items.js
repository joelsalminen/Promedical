import React, { Component } from 'react';
import $ from 'jquery';
import StorageListItem from './StorageComponents/StorageListItem';
import ItemsListHeader from './StorageComponents/ItemsListHeader';

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

		this.checkExpirationDate = this.checkExpirationDate.bind(this);
		this.parseLendings = this.parseLendings.bind(this);
		this.parseItems = this.parseItems.bind(this);
		this.filterItems = this.filterItems.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.saveItem = this.saveItem.bind(this);

		this.onNameChange = this.onNameChange.bind(this);
		this.onInStorageChange = this.onInStorageChange.bind(this);
		this.onNotInStorageChange = this.onNotInStorageChange.bind(this);
		this.onExpiredChange = this.onExpiredChange.bind(this);

		
	}


	componentDidMount(){
		// get items data
		$.ajax({
			url: 'api/items',
			method: 'get',
			success: (res)=>{
				this.setState({items: this.parseItems(res)});
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


	/* Helps filtering items */
	filterItemsInStorage(items){
		/* Filtering items by search bar info */
		items = items.filter(item => {
			let information = item.name + item.serial.toString();
			return information.indexOf(this.state.nameSearch)!== -1
		});

		/* Filtering items by location */
		if (this.state.notInStorage === false){
			items = [];
		}
		return items;
	}


	/* Helps with filtering lendings */
	filterLendings(lendings){
		/* Filtering lending items by search bar info */
		lendings = lendings.filter(lending => {
			let information = lending.item.name + lending.item.serial;
			return information.indexOf(this.state.nameSearch)!== -1;
		});

		/* Filtering items by location */
		if (this.state.inStorage === false){
			lendings = [];
		}

		return lendings;
	}


	/* Parses the lendings data in a way that it can be used in the item list */
	parseLendings(lendings){
		let lentItems = [];

		lendings.forEach((lending)=>{

			lending.inStorage = false;
			lentItems.push(lending);
		});
		return lentItems;
	}

	/* Parses item data for later usage */
	parseItems(items){
		items.forEach((item)=>{
			item.inStorage = true;
		});
		return items;
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
		//console.log(date);
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

	filterItems() {
		let items = this.state.items.map(item=>Object.assign({}, item));
		let iItems = [];
		let lendings = [];

		items.forEach(item => {
			if (item.inStorage === true){
				iItems.push(item);
			} 
			else {
				lendings.push(item);
			}
		});

		iItems = this.filterItemsInStorage(iItems);
		lendings = this.filterLendings(lendings);
		
		/* Filtering items by expiration */
		// if (this.state.showExpired === false){
		// 	lendings = lendings.filter(lending => this.checkExpirationDate(lending.returnDate) !== -1);
		// }

		/* Combine lists */
		let filteredItems = [];
		filteredItems.push(...iItems);
		filteredItems.push(...lendings);
		
		return filteredItems;
	}


	deleteItem(item){
		/* Delete item from database */
		$.ajax({
			url: '/api/items/' + item._id,
			method: 'delete',
			success: (res)=>{
				
				/* Delete item from storage list */
				let items = this.state.items.map((item)=>Object.assign({}, item));
				items = items.filter((item)=>{
					return item._id !== res._id;
				});
				this.setState({items});
			}
		});
	}

	saveItem(oldItem, newItem){
		/* Create copy of items list*/
		const items = this.state.items.map(item => Object.assign({}, item));

		/* Find the correct item on the copies list */
		let foundItem = items.find(item=>{
			return item.name === oldItem.name;
		});

		/* Change properties */
		foundItem.name = newItem.name;

		/* make ajax call to also store changes at backend */
		$.ajax({
			url: '/api/items/' + foundItem._id,
			method: 'put',
			data: foundItem,
			success: (res)=>{
				/* Update items state */
				this.setState({items});
			}
		});
	}



	onNameChange(evt){
		this.setState({nameSearch: evt.target.value})
	}


	onInStorageChange(evt){
		if (this.state.inStorage === true){
			this.setState({inStorage: false})
		}

		else{
			this.setState({inStorage: true})
		}
	}


	onNotInStorageChange(evt){
		if (this.state.notInStorage === true){
			this.setState({notInStorage: false})
		}

		else{
			this.setState({notInStorage: true})
		}
	}

	onExpiredChange(evt){
		if (this.state.showExpired === true){
			this.setState({showExpired: false})
		}

		else{
			this.setState({showExpired: true})
		}
	}


	render(){
		/* Filtering of items list */
		let items = this.filterItems();

		
		
		return (
			<div>
				<h1>Varasto</h1>
				<input placeholder="haku" onChange={this.onNameChange} value={this.state.nameSearch}></input>

				<div>
					<input type="checkbox" name="inStorage" onChange={this.onInStorageChange} defaultChecked={this.state.inStorage} />
					<label htmlFor='inStorage'>Varastossa</label>

					<input type="checkbox" name="notInStorage" onChange={this.onNotInStorageChange} defaultChecked={this.state.notInStorage} />
					<label htmlFor='notInStorage'>Asiakkaalla</label>

					<input type="checkbox" name="expired" onChange={this.onExpiredChange} defaultChecked={this.state.expired} />
					<label htmlFor='expired'>Erääntyneet tuotteet</label>
				</div>

				<table id="StorageList">
					<ItemsListHeader />
					
					<tbody>
						{items.map((item, index) => <StorageListItem key={index} item={item} deleteItem={this.deleteItem} saveItem={this.saveItem} />)}
					</tbody>

				</table>




			</div>
		);
	}
	
}


export default Items;