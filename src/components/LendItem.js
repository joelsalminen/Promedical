import React, { Component } from 'react';
import Dropdown from "react-dropdown";
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import Menu from './MainComponents/MainMenuButton';
import SuggestionList from "./MainComponents/SuggestionList";

import './LendItem.css'

/* Sends data to backend when lending is written down */
class LendItem extends Component{
	constructor(props){
		super(props)
		this.state = {
			user: localStorage.getItem('username'),
			itemName: "",
			customer: "",
			contactInfo: "",
			lendType: "Valitse",
			price: "0",

			startDate: moment(),
      returnDate: moment().add(7, 'days'),
      start: "",
      return: "",
      items: [],
      toLend: []
		}

		this.filterSuggestions = this.filterSuggestions.bind(this);
		this.resetFields = this.resetFields.bind(this);

		this.onLendItemClick = this.onLendItemClick.bind(this);
		this.onItemNameChange = this.onItemNameChange.bind(this);
		this.onCustomerNameChange = this.onCustomerNameChange.bind(this);
		this.onContactInfoChange = this.onContactInfoChange.bind(this);
		this.onUserChange = this.onUserChange.bind(this);
		this.onLendTypeChange = this.onLendTypeChange.bind(this);
		this.onPriceChange = this.onPriceChange.bind(this);
		this.onSuggestionClick = this.onSuggestionClick.bind(this);
		this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onReturnDateChange = this.onReturnDateChange.bind(this);
	}


	componentDidMount(){
		/* Initialize date data */
		this.setState({
      start: moment().format().substring(0,10),
      return: moment().add(7, 'days').format().substring(0,10)
    });

		/* Fetch item data from backend */
		$.ajax({
      headers: {
        'Authorization': localStorage.getItem('token')
      },
			url: '/api/items',
			post: 'get',
			success: (res)=>{
				this.setState({items: res})
			}
		});


		
	}


	/* Check whether all required fields are filled */
	validateInput(){
		if (this.state.user === ""){
			return "Please type in the name of the person who fethced these items";
		}
		else if(this.state.toLend.length === 0){
			return "Please select items to lend";
		}
		else if(this.state.customer === ""){
			return "Please type in customer name";
		}
		else if(this.state.contactInfo === ""){
			return "Please type in customer contact info";
		}
		else if(this.state.lendType === "Valitse"){
			return "Please select lend type";
		}
		return null;
	}


	/* Filters items on a list based input data of Lend Item Name */
	filterSuggestions(items) {
		/* filter out items that don't include the same data that is in this.state.itemName */
		items = items.filter((item) => item.name.toLowerCase().indexOf(this.state.itemName.toLowerCase()) !== -1);
		
		/* The list of items is only shown when some input typed into Lend Item Name field*/
		if (this.state.itemName === ""){
			return [];	
		}

		return items;
	}


	/* Send data to backend to be stored in a database*/
	/* Fired whenever Lend Item button is clicked */
	onLendItemClick(){
		if (this.validateInput()){
			this.setState({ error: this.validateInput() });
			return;
		}

		// get required data
		this.state.toLend.forEach((item)=>{
			let data = {
				lender: this.state.user,
				customer: this.state.customer,
				contactInfo: this.state.contactInfo,
				startDate: this.state.start,
				returnDate: this.state.return,
				lendType: this.state.lendType,
				price: this.state.price,
				itemName: item.name,
				itemSerial: item.serial,
				itemId: item._id


			};

			/* ajax call to post a lending */
			$.ajax({
				url: '/api/lendings',
				method: 'post',
	      headers: {
	        'Authorization': localStorage.getItem('token')
	      },
				data: data,
				success: (lending)=>{

					/* delete item from items */
					$.ajax({
						url: '/api/items/' + lending.item._id,
						method: 'delete',
			      headers: {
			        'Authorization': localStorage.getItem('token')
			      },
						success: (res)=>{
							/* Reset input fields */
							this.setState({
								lendItem: "Valitse",
								itemName: "", 
								customer: "",
								contactInfo: "", 
								price: "0",
								toLend: [],
								startDate: moment(),
								returnDate: moment().add(7, 'days')

							});
						}
					});
			
				}
					
			});

				
			
		});

	}

	resetFields(){
		this.setState({
			lendItem: "Valitse",
			itemName: "", 
			customer: "",
			contactInfo: "", 
			price: "0",
			toLend: [],
			startDate: moment(),
			returnDate: moment().add(7, 'days')

		});
	}

	/* Fired whenever Customer field data changes */
	onCustomerNameChange(evt){
		this.setState({ 
			customer: evt.target.value,
			error: ''
		 });
	}

	/* Fired whenever Item Name field data changes */
	onItemNameChange(evt){
		this.setState({
			itemName: evt.target.value,
			error: ''
		});
	}

	/* Fired whenever Contact Info field data changes */
	onContactInfoChange(evt){
		this.setState({ 
			contactInfo: evt.target.value,
			error: ''
		});
	}

	/* Fired whenever Username field data changes */
	onUserChange(evt){
		this.setState({
			user: evt.target.value,
			error: ''
		});
	}

	/* Fired when lendItem state is changed */
	onLendTypeChange(evt){
		this.setState({
			lendType: evt.value,
			error: ''
		});
	}

	/* Fired whenever Price field data changes */
	onPriceChange(evt){
		this.setState({
			price: evt.target.value,
			error: '' 
		});
	}

	/* Fired whenever suggested items on a list are clicked */
	onSuggestionClick(itemToLend){
		/* Add items to toLend state */
		let toLend = this.state.toLend.map(item => Object.assign({}, item));
		toLend.push(itemToLend);

		/* Remove item from items */
		let items = this.state.items.map(item => Object.assign({}, item));
		items = items.filter(item => {
			return item._id !== itemToLend._id;
		});

		/* Update states */
		this.setState({items, toLend});
	}

	/* Fired whenever Start date field data changes */
  onStartDateChange(date){
    this.setState({
      startDate: date
    });

    this.setState({
      start: date.format().substring(0,10)
    });
    
    
  }
	/* Fired whenever Return date field data changes */
  onReturnDateChange(date){
    this.setState({
      return: date.format().substring(0,10),
      returnDate: date
    });
    
  }


	renderPrice(){
		if (this.state.lendType === "Sijaislaite (maksullinen)"){
			return(
				<div>
					<p>Lainauksen hinta:</p>
					<input name="price" value={this.state.price} placeholder="Hinta" onChange={this.onPriceChange}/>
				</div>
			);
		}
	}
	

	render(){
		const options = [
			"Koekäyttö", "Sijaislaite (maksullinen)", "Sijaislaite (maksuton)"
		];

		/* Filter items based on Lend Item Name field input */
		let itemsList = this.filterSuggestions(this.state.items);

		return(
		<div className="LendItem">
			<Menu />

			<h1 className="LendItem__header PageHeader">Lainaus</h1>
			<div className="inputFields">

				<p>Tuotteen varastosta hakija:</p>
				<input name="employee_name" value={this.state.user} onChange={this.onUserChange}/>

				<p>Lainattava tuote:</p>
				<ul>
					{this.state.toLend.map((item, index) => <li key={index}>{item.name} </li> )}
				</ul>

				<input name="item_name" value={this.state.itemName} onChange={this.onItemNameChange}/>
				<ul>
					{itemsList.map((item, index) => <SuggestionList key={index} item={item} clickAction={this.onSuggestionClick} />)}
				</ul>

				<p>Asiakas:</p>
				<input name="customer_name" value={this.state.customer} onChange={this.onCustomerNameChange}/>
				

				<p>Asiakkaan yhteystiedot:</p>
				<input name="customer_info" value={this.state.contactInfo} onChange={this.onContactInfoChange}/>
				
				<p>Lainauksen luonne:</p>
				<div className="LendItemMenu__DropDown">
					<Dropdown
		        options={options}
		        onChange={this.onLendTypeChange}
		        value={this.state.lendType} 
		      />
	      </div>
	     	<div>
					<p>Lainauksen hinta:</p>
					<input 
						disabled={this.state.lendType !== "Sijaislaite (maksullinen)"}
						name="price"
						value={this.state.price}
						placeholder="Hinta"
						onChange={this.onPriceChange}/>
				</div>

				<p>Lainauspäivä:</p>
				<div className="LendItem__DatePicker">

					<DatePicker
			      selected={this.state.startDate}
			      onChange={this.onStartDateChange} />

			    <p>Palautuspäivä:</p>
			    <DatePicker
			     	selected={this.state.returnDate}
			     	onChange={this.onReturnDateChange}
			    />
		    </div>

			</div>

			
			<p>{this.state.error}</p>
			<div>
				<button className="LendItem__button bottomButton" onClick={this.onLendItemClick}>Kirjaa lainaus</button>
				<button className="LendItem__button bottomButton" onClick={this.resetFields}>Tyhjennä</button>
			</div>
			
			


		</div>);
	}

}
export default LendItem;


/* Joel Salminen - joel.salminen@student.lut.fi */