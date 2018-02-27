import Menu from "./MainComponents/MainMenuButton";
import React, { Component } from 'react';
import SuggestInput from "./ItemSuggestion";
import Dropdown from "react-dropdown";



class LendAndReturn extends Component{
	constructor(props){
		super(props)
		this.state = {
			user: "Test_user1",
			date: "",
			amount: 1,
			customer: "",
			contactInfo: "",
			lendType: "",
			price: ""
		}


		this.setDate = this.setDate.bind(this);
		this.increaseByOne = this.increaseByOne.bind(this);
		this.decreaseByOne = this.decreaseByOne.bind(this);
		this.addItem = this.addItem.bind(this);
		this.scanItem = this.scanItem.bind(this);

		this.customerChangeHandler = this.customerChangeHandler.bind(this);
		this.contactInfoChangeHandler = this.contactInfoChangeHandler.bind(this);
		this.userChangeHandler = this.userChangeHandler.bind(this);
		this.lendTypeChangeHandler = this.lendTypeChangeHandler.bind(this);
		this.priceChangeHandler = this.priceChangeHandler.bind(this);
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

	componentWillMount(){
		this.setDate();
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

	addItem(){
		console.log("Item added");
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
			<input name="current_date" placeholder="Päivämäärä tänään" defaultValue={this.state.date}/>
			<br/>
			<input name="expiration" placeholder="Palautuspäivämäärä" />
			<br/>


			<br/>

			{/* dates have no handlers yer*/}
			<SuggestInput/>
			<button onClick={this.decreaseByOne}>-</button>
			<input name="amount" placeholder="Lukumäärä" changeHandler={this.increaseByOne} value={this.state.amount}/>
			<button onClick={this.increaseByOne} value={1}>+</button>
			<br/>

			<br/>
			<Dropdown
        options={options}
        placeholder={"Lainauksen luonne"}
        onChange={this.lendTypeChangeHandler} />

			<input name="price" placeholder="Hinta" onChange={this.priceChangeHandler}/>
			<br/>

			<button onClick={this.addItem}>Lisää</button>


			
		</div>);
	}

}
export default LendAndReturn;
