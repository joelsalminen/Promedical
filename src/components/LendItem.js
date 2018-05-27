import Menu from "./MainComponents/MainMenuButton";
import React, { Component } from 'react';
import Dropdown from "react-dropdown";
import SuggestionList from "./MainComponents/SuggestionList";
import $ from 'jquery';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

/* Sends data to backend when lending is written down */
class LendItem extends Component{
	constructor(props){
		super(props)
		this.state = {
			user: "Test_user1",
			itemName: "",
			customer: "",
			contactInfo: "",
			lendType: "Valitse",
			price: "0",

			startDate: moment(),
      returnDate: moment(),
      start: "",
      return: "",
      items: [],
      toLend: []
		}


		this.setDate = this.setDate.bind(this);
		this.filterSuggestions = this.filterSuggestions.bind(this);

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
		this.setDate();
		this.setState({
      start: moment().format().substring(0,10)
    });

		/* Fetch item data from backend*/
		$.ajax({
			url: '/api/items',
			post: 'get',
			success: (res)=>{this.setState({items: res})}
		});
		
	}


	/* Set initial date according to current time */ 
	setDate(){
		const current = new Date();
		const currentYear = current.getUTCFullYear();
		const currentMonth = current.getUTCMonth() + 1;
		const currentDay = current.getUTCDate();

		const datex = "".concat(currentDay, ".", currentMonth, ".", currentYear);
		this.setState({date: datex});
	}


	/* Filters items on a list based input data of Lend Item Name */
	filterSuggestions(items) {
		/* filter out items that don't include the same data that is in this.state.itemName */
		items = items.filter((item) => item.name.indexOf(this.state.itemName) !== -1);
		
		/* The list of items is only shown when some input typed into Lend Item Name field*/
		if (this.state.itemName === ""){
			return [];	
		}

		return items;
	}


	/* Send data to backend to be stored in a database*/
	/* Fired whenever Lend Item button is clicked */
	onLendItemClick(){

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
				data: data,
				success: (lending)=>{

					/* delete item from items */
					$.ajax({
						url: '/api/items/' + lending.item._id,
						method: 'delete',
						success: (res)=>{
							console.log(res);
						}
					});
			
				}
					
			});

				
			
		});




	}

	/* Fired whenever Customer field data changes */
	onCustomerNameChange(evt){
		this.setState({customer: evt.target.value });
	}

	/* Fired whenever Item Name field data changes */
	onItemNameChange(evt){
		this.setState({itemName: evt.target.value });
	}

	/* Fired whenever Contact Info field data changes */
	onContactInfoChange(evt){
		this.setState({contactInfo: evt.target.value });
	}

	/* Fired whenever Username field data changes */
	onUserChange(evt){
		this.setState({user: evt.target.value });
	}

	/* Fired when lendItem state is changed */
	onLendTypeChange(evt){
		this.setState({lendType: evt.value});
	}

	/* Fired whenever Price field data changes */
	onPriceChange(evt){
		this.setState({price: evt.target.value });
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
				<input name="price" placeholder="Hinta" onChange={this.onPriceChange}/>
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
		<div id="LendItemMenu">
			<Menu />

			<h1>Lainaus</h1>

			<p>Tuotteen varastosta hakija:</p>
			<input name="employee_name" placeholder="Tuotteen varastosta hakija" defaultValue={this.state.user} onChange={this.onUserChange}/>
			<br/>

			<p>Lainattava tuote:</p>
			<ul>
				{this.state.toLend.map((item, index) => <li key={index}>{item.name} </li> )}
			</ul>

			<input name="item_name" placeholder="Tuotteen nimi" onChange={this.onItemNameChange} value={this.state.itemName}/>
			<ul>
				{itemsList.map((item, index) => <SuggestionList key={index} item={item} clickAction={this.onSuggestionClick} />)}
			</ul>

			<p>Asiakas</p>
			<input name="customer_name" placeholder="Asiakas" onChange={this.onCustomerNameChange}/>
			<br/>

			<p>Asiakkaan yhteystiedot:</p>
			<input name="customer_info" placeholder="Asiakkaan yhteystiedot" onChange={this.onContactInfoChange}/>
			<br/>
			
			<p>Lainauspäivä:</p>
			<DatePicker
	      selected={this.state.startDate}
	      onChange={this.onStartDateChange} />

	    <p>Palautuspäivä:</p>
	    <DatePicker
	     	selected={this.state.returnDate}
	     	onChange={this.onReturnDateChange} />

			<br/>
			<p>Lainauksen luonne:</p>
			<div className="Dropdown">
			<Dropdown
        options={options}
        placeholder={this.state.lendType}
        onChange={this.onLendTypeChange} />
      </div>
      {this.renderPrice()}


			<br/>
			<br/>

			<button className="SubmitButton" onClick={this.onLendItemClick}>Kirjaa lainaus</button>



		</div>);
	}

}
export default LendItem;


/* Joel Salminen - joel.salminen@student.lut.fi */