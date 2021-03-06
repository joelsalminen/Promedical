import React, { Component } from 'react';
import { DialogContainer } from 'react-md';
import $ from 'jquery';
import moment from 'moment';

import StorageListItem from './StorageComponents/StorageListItem';
import ItemsListHeader from './StorageComponents/ItemsListHeader';
import LendingEdit from './StorageComponents/LendingEdit';
import CheckBox from './StorageComponents/CheckBox/CheckBox.js';
import Menu from "./MainComponents/MainMenuButton";

import './Storage.css';

class Items extends Component{
	constructor(props){
		super(props)
		this.state = {
			nameSearch: "",
			serialSearch: "",
			inStorage: true,
			notInStorage: true,
			expired: true,
			notExpired: true,
			items: [],
			// lendings: [],
			lendingEditVisible: false,
			lendingToEdit: null,
		}

		this.checkExpirationDate = this.checkExpirationDate.bind(this);
		this.parseLendings = this.parseLendings.bind(this);
		this.parseItems = this.parseItems.bind(this);
		this.filterItems = this.filterItems.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.saveItem = this.saveItem.bind(this);
		this.editLending = this.editLending.bind(this);
		this.onLendingEditHide = this.onLendingEditHide.bind(this);
		this.updateItems = this.updateItems.bind(this);

		this.onNameChange = this.onNameChange.bind(this);
		this.onInStorageChange = this.onInStorageChange.bind(this);
		this.onNotInStorageChange = this.onNotInStorageChange.bind(this);
		this.onExpiredChange = this.onExpiredChange.bind(this);
		this.onNotExpiredChange = this.onNotExpiredChange.bind(this);

		this.onCustomerChange = this.onCustomerChange.bind(this);
		
	}


	componentDidMount(){
		// get items data
		$.ajax({
			url: 'api/items',
			method: 'get',
      headers: {
        'Authorization': localStorage.getItem('token')
      },
			success: (res)=>{
				this.setState({items: this.parseItems(res)});
			}
		});

	 // get lendings data
	 $.ajax({
	 	url: 'api/lendings',
	 	method: 'get', 
    headers: {
      'Authorization': localStorage.getItem('token')
    },
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
			console.log(item)
			let information = item.name.toLowerCase() + item.serial.toString();
			return information.indexOf(this.state.nameSearch.toLowerCase())!== -1
		});

		/* Filtering items by location */
		if (!this.state.inStorage){
			items = [];
		}
		return items;
	}


	/* Helps with filtering lendings */
	filterLendings(lendings){
		/* Filtering lending items by search bar info */
		lendings = lendings.filter(lending => {
			let information = lending.item.name.toLowerCase() + lending.item.serial;
			return information.indexOf(this.state.nameSearch.toLowerCase())!== -1;
		});

		/* Filtering items by location */
		if (!this.state.notInStorage){
			lendings = [];
		}

		/* Filtering items by expiration */
		if (!this.state.expired){
			lendings = lendings.filter(lending => 
				moment(lending.returnDate).diff(moment()) > 0
			);
		}
		if(!this.state.notExpired){
			lendings = lendings.filter(lending => 
				moment(lending.returnDate).diff(moment()) < 0
			);
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
      headers: {
        'Authorization': localStorage.getItem('token')
      },
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
		foundItem.serial = newItem.serial;

		/* make ajax call to also store changes at backend */
		$.ajax({
			url: '/api/items/' + foundItem._id,
			method: 'put',
      headers: {
        'Authorization': localStorage.getItem('token')
      },
			data: foundItem,
			success: (res)=>{
				/* Update items state */
				this.setState({items});
			}
		});
	}

	updateItems(newItem){
		const { items } = this.state;
		let updatedItems = items.map(object => Object.assign({}, object));
		const index = updatedItems.findIndex(item => item._id === newItem._id);

		updatedItems[index] = newItem;
		this.setState({ items: updatedItems });
	}

	onLendingEditHide(){
		this.setState({ lendingEditVisible: false });
	}

	editLending(item){

		this.setState({ 
			lendingEditVisible: true,
			lendingToEdit: item
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
		if (this.state.expired === true){
			this.setState({expired: false})
		}

		else{
			this.setState({expired: true})
		}
	}

	onNotExpiredChange(evt){
		this.setState(prevState => ({
			notExpired: !prevState.notExpired
		}));

	}

	onCustomerChange(evt){
		this.setState({ customer: evt.tagget.value });
	}

	toggleInStorage = () => {
		this.setState(prevState => ({
			inStorage: !prevState.inStorage
		}));
	}

	toggleNotInStorage = () => {
		this.setState(prevState => ({
			notInStorage: !prevState.notInStorage
		}));
	}

	toggleExpired = () => {
		this.setState(prevState => ({
			expired: !prevState.expired
		}));
	}

	toggleNotExpired = () => {
		this.setState(prevState => ({
			notExpired: !prevState.notExpired
		}));
	}

	render(){
		/* Filtering of items list */
		let items = this.filterItems();
		const { 
			lendingToEdit, 
			inStorage,
			notInStorage,
			expired,
			notExpired,
		} = this.state;

		return (
			<div className="Items">
				<Menu />
				<DialogContainer 
					id="editLending"
					aria-labelledby="Edit lending"
					visible={this.state.lendingEditVisible}
					onHide={this.onLendingEditHide}
					focusOnMount={false}
					height={500}
				>
					{lendingToEdit && 
						<LendingEdit 
							lending={lendingToEdit}
							closeEdit={this.onLendingEditHide}
							updateItems={this.updateItems}
						/>

					}

				</DialogContainer>
				<h1 className="PageHeader">Seuranta</h1>
				<div className="inputFields">
					<input placeholder="haku" onChange={this.onNameChange} value={this.state.nameSearch}></input>
				</div>

				<div className="Item__checkboxes">

					<CheckBox 
						toggleCheckBox={this.toggleInStorage}
						checked={inStorage}
						label="Varastossa"
					/>

					<CheckBox 
						toggleCheckBox={this.toggleNotInStorage}
						checked={notInStorage}
						label="Asiakkaalla"
					/>


					<CheckBox 
						toggleCheckBox={this.toggleExpired}
						checked={expired}
						label="Erääntyneet tuotteet"
					/>



					<CheckBox 
						toggleCheckBox={this.toggleNotExpired}
						checked={notExpired}
						label="Ei-erääntyneet tuotteet"
					/>


				</div>

					<ul>
						{items.map((item, index) => <StorageListItem key={index} item={item} deleteItem={this.deleteItem} saveItem={this.saveItem} editLending={this.editLending}/> )}
					</ul>

			</div>
		);
	}
	
}


export default Items;