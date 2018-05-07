import Menu from "./MainComponents/MainMenuButton";
import React, { Component } from 'react';
import SuggestInput from "./ItemSuggestion";
import Dropdown from "react-dropdown";

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class LendItem extends Component{
	constructor(props){
		super(props)
		this.state = {
			user: "Test_user1",
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



	setDate(){
		const current = new Date();
		const currentYear = current.getUTCFullYear();
		const currentMonth = current.getUTCMonth() + 1;
		const currentDay = current.getUTCDate();

		const datex = "".concat(currentDay, ".", currentMonth, ".", currentYear);
		this.setState({date: datex});
	}

	lendItem(){
		console.log("user: ", this.state.user);
		console.log("customer: ", this.state.customer);
		console.log("contact info: ", this.state.contactInfo);
		console.log("lendType", this.state.lendType);
		console.log("price", this.state.price);
		console.log("start: ", this.state.start);
		console.log("return: ", this.state.return);


	}

	scanItem(){
		console.log("Scanned");
	}

	
	render(){
		 const options = [
			"Koekäyttö", "Sijaislaite (maksullinen)", "Sijaislaite (maksuton)"
		];

		return(
		<div id="LendItemMenu">
			
			<Menu />

			<h1>Lainaus</h1>
			<button onClick={this.scanItem} id="scan_button">Skannaa</button>
			{/* why do these have names?  */}

			<p>Tuotteen varastosta hakija:</p>
			<input name="employee_name" placeholder="Tuotteen varastosta hakija" defaultValue={this.state.user} onChange={this.userChangeHandler}/>
			<br/>
			<p>Lainattava tuote:</p>
			{/*suggest input doesn't give value*/}
			<SuggestInput/>

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
