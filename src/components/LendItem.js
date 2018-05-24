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
			lendType: "",
			price: "",

			startDate: moment(),
      returnDate: moment(),
      start: "",
      return: "",
      items: [],
      toLend: []
		}


		this.setDate = this.setDate.bind(this);
		this.lendItem = this.lendItem.bind(this);
		this.scanItem = this.scanItem.bind(this);
		this.filterItems = this.filterItems.bind(this);

		this.itemNameChangeHandler = this.itemNameChangeHandler.bind(this);
		this.customerChangeHandler = this.customerChangeHandler.bind(this);
		this.contactInfoChangeHandler = this.contactInfoChangeHandler.bind(this);
		this.userChangeHandler = this.userChangeHandler.bind(this);
		this.lendTypeChangeHandler = this.lendTypeChangeHandler.bind(this);
		this.priceChangeHandler = this.priceChangeHandler.bind(this);
		this.suggestionClickHandler = this.suggestionClickHandler.bind(this);
		this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.returnDateChangeHandler = this.returnDateChangeHandler.bind(this);
	}

	/* Filters items on a list based input data of Lend Item Name */
	filterItems(items) {
		
		items = items.filter((item) => item.name.indexOf(this.state.itemName) !== -1);
		items = items.filter((item) => item.location.indexOf("varasto") !== -1);
		
		/* The list of items is only shown when some input typed into Lend Item Name field*/
		if (this.state.itemName === ""){
			return [];	
		}

		return items;
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


	/* Send data to backend to be stored in a database*/
	/* Fired whenever Lend Item button is clicked */
	lendItem(){

		this.state.toLend.forEach((item)=>{
			let data = {
				lender: this.state.user,
				customerName: this.state.customer,
				contactInfo: this.state.contactInfo,
				startDate: this.state.date,
				returnDate: this.state.return,
				lendType: this.state.lendType,
				price: this.state.price,
				itemName: item.name,
				itemSerial: item.serial,
				itemId: item._id


			};
			let request = $.ajax({
				url: '/api/lendings',
				type: 'POST',
				data: data

			});
			request.done((response)=>{console.log(response)});
			
			
		});




	}

	/* Fired when Scan item button is clicked */
	scanItem(){
		console.log("Scanned");
	}

	/* Fired whenever Customer field data changes */
	customerChangeHandler(evt){
		this.setState({customer: evt.target.value });
	}

	/* Fired whenever Item Name field data changes */
	itemNameChangeHandler(evt){
		this.setState({itemName: evt.target.value });
	}

	/* Fired whenever Contact Info field data changes */
	contactInfoChangeHandler(evt){
		this.setState({contactInfo: evt.target.value });
	}

	/* Fired whenever Username field data changes */
	userChangeHandler(evt){
		this.setState({user: evt.target.value });
	}

	/* Fired whenever Customer field data changes */
	lendTypeChangeHandler(evt){
		this.setState({lendType: evt.value });
	}

	/* Fired whenever Price field data changes */
	priceChangeHandler(evt){
		this.setState({price: evt.target.value });
	}

	/* Fired whenever suggested items on a list are clicked */
	suggestionClickHandler(item){
		let list = this.state.toLend;
		list.push(item);
		/* Add items to toLend state */
		this.setState({toLend: list, itemName:""});

	}

	/* Fired whenever Start date field data changes */
  startDateChangeHandler(date){
    this.setState({
      startDate: date
    });

    this.setState({
      start: date.format().substring(0,10)
    });
    
    
  }
	/* Fired whenever Return date field data changes */
  returnDateChangeHandler(date){
    this.setState({
      return: date.format().substring(0,10),
      returnDate: date
    });
    
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


	
	render(){
		const options = [
			"Koekäyttö", "Sijaislaite (maksullinen)", "Sijaislaite (maksuton)"
		];

		/* Filter items based on Lend Item Name field input */
		let itemsList = this.filterItems(this.state.items);

		return(
		<div id="LendItemMenu">
			<Menu />

			<h1>Lainaus</h1>

			<button onClick={this.scanItem} className="ScanButton">Skannaa</button>

			<p>Tuotteen varastosta hakija:</p>
			<input name="employee_name" placeholder="Tuotteen varastosta hakija" defaultValue={this.state.user} onChange={this.userChangeHandler}/>
			<br/>

			<p>Lainattava tuote:</p>
			<ul>
				{this.state.toLend.map((item, index) => <li key={index}>{item.name} </li> )}
			</ul>

			<input name="item_name" placeholder="Tuotteen nimi" onChange={this.itemNameChangeHandler} value={this.state.itemName}/>
			<ul>
				{itemsList.map((item, index) => <SuggestionList item={item} index={index} clickAction={this.suggestionClickHandler} />)}
			</ul>

			<p>Asiakas</p>
			<input name="customer_name" placeholder="Asiakas" onChange={this.customerChangeHandler}/>
			<br/>

			<p>Asiakkaan yhteystiedot:</p>
			<input name="customer_info" placeholder="Asiakkaan yhteystiedot" onChange={this.contactInfoChangeHandler}/>
			<br/>
			
			<p>Lainauspäivä:</p>
			<DatePicker
	      selected={this.state.startDate}
	      onChange={this.startDateChangeHandler} />

	    <p>Palautuspäivä:</p>
	    <DatePicker
	     	selected={this.state.returnDate}
	     	onChange={this.returnDateChangeHandler} />

			<br/>
			<p>Lainauksen luonne:</p>
			<div className="Dropdown">
			<Dropdown
        options={options}
        placeholder={"Lainauksen luonne"}
        onChange={this.lendTypeChangeHandler} />
      </div>


      <p>Lainauksen hinta:</p>
			<input name="price" placeholder="Hinta" onChange={this.priceChangeHandler}/>
			<br/>
			<br/>

			<button className="SubmitButton" onClick={this.lendItem}>Kirjaa lainaus</button>



		</div>);
	}

}
export default LendItem;


/* Joel Salminen - joel.salminen@student.lut.fi */