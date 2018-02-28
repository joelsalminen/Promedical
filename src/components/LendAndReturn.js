import Menu from "./MainComponents/MainMenuButton";
import React, { Component } from 'react';
import SuggestInput from "./ItemSuggestion";
import Dropdown from "react-dropdown";

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class LendAndReturn extends Component{
	constructor(props){
		super(props)
		this.state = {
			user: "Test_user1",
			amount: 1,
			customer: "",
			contactInfo: "",
			lendType: "",
			price: "",

			startDate: moment(),
      returnDate: moment(),
      start: "",
      return: ""
		}


		this.setDate = this.setDate.bind(this);
		this.increaseByOne = this.increaseByOne.bind(this);
		this.decreaseByOne = this.decreaseByOne.bind(this);
		this.lendItem = this.lendItem.bind(this);
		this.scanItem = this.scanItem.bind(this);

		this.customerChangeHandler = this.customerChangeHandler.bind(this);
		this.contactInfoChangeHandler = this.contactInfoChangeHandler.bind(this);
		this.userChangeHandler = this.userChangeHandler.bind(this);
		this.lendTypeChangeHandler = this.lendTypeChangeHandler.bind(this);
		this.priceChangeHandler = this.priceChangeHandler.bind(this);

		this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.returnDateChangeHandler = this.returnDateChangeHandler.bind(this);
	}

	customerChangeHandler(evt){
		this.setState({customer: evt.target.value });

	}

	contactInfoChangeHandler(evt){
		this.setState({contactInfo: evt.target.value });
	}

	userChangeHandler(evt){
		this.setState({user: evt.target.value });
	}

	lendTypeChangeHandler(evt){
		this.setState({lendType: evt.value });
	}

	priceChangeHandler(evt){
		this.setState({price: evt.target.value });
	}

  startDateChangeHandler(date){
    this.setState({
      startDate: date
    });

    this.setState({
      start: date.format().substring(0,10)
    });
    
    
  }

  returnDateChangeHandler(date){
    this.setState({
    	returnDate: date
    });

    this.setState({
      return: date.format().substring(0,10)
    });
    
  }


	componentWillMount(){
		this.setDate();
		this.setState({
      start: moment().format().substring(0,10)
    });
	}


	increaseByOne(){
		let newAmount = this.state.amount + 1;
		this.setState({amount: newAmount});

	}

	decreaseByOne(){
		let newAmount = this.state.amount -1;
		if (newAmount > 0){
		this.setState({amount: newAmount});
		}

	}

	setDate(){
		const current = new Date();
		const currentYear = current.getUTCFullYear();
		const currentMonth = current.getUTCMonth() + 1;
		const currentDay = current.getUTCDate();

		const datex = "".concat(currentDay, ".", currentMonth, ".", currentYear);
		this.setState({date: datex});
	}

	lendItem(){
		console.log("Item Lended");
	}

	scanItem(){
		console.log("Scanned");
	}

	
	render(){
		 const options = [
			"Koekäyttö", "Sijaislaite (maksullinen)", "Sijaislaite (maksuton)"
		];

		return(
		<div>
			<Menu />
			<button onClick={this.scanItem} id="scan_button">Skannaa</button>
			{/* why do these have names?  */}
			<input name="employee_name" placeholder="Tuotteen varastosta hakija" defaultValue={this.state.user} onChange={this.userChangeHandler}/>
			<br/>
			<input name="customer_name" placeholder="Asiakas" onChange={this.customerChangeHandler}/>
			<br/>
			<input name="customer_info" placeholder="Asiakkaan puhelinnumero" onChange={this.contactInfoChangeHandler}/>
			<br/>

		{/* dates have no handlers yer*/}
			
			<p>Lainauspv:</p>
			<DatePicker
	      selected={this.state.startDate}
	      onChange={this.startDateChangeHandler} />

	    <p>Palautuspv:</p>
	    <DatePicker
	     	selected={this.state.returnDate}
	     	onChange={this.returnDateChangeHandler} />
			<br/>


			<br/>

			{/* dates have no handlers yer*/}
			<SuggestInput/>
			<button onClick={this.decreaseByOne}>-</button>
			<input name="amount" placeholder="Lukumäärä" onChange={this.increaseByOne} value={this.state.amount}/>
			<button onClick={this.increaseByOne} value={1}>+</button>
			<br/>

			<br/>
			<Dropdown
        options={options}
        placeholder={"Lainauksen luonne"}
        onChange={this.lendTypeChangeHandler} />

			<input name="price" placeholder="Hinta" onChange={this.priceChangeHandler}/>
			<br/>

			<button onClick={this.lendItem}>Lisää</button>


			

			<p>{this.state.start}</p>
			<p>{this.state.return}</p>

		</div>);
	}

}
export default LendAndReturn;
