import Menu from "./MainComponents/MainMenuButton";
import React, { Component } from 'react';
import S from "./ItemSuggestion";
import Dropdown from "react-dropdown";
import Calendar from 'react-input-calendar'



class LendAndReturn extends Component{
	constructor(props){
		super(props)
		this.state = {
			user: "Test_user1",
			date: "",
			amount: 0
		}

		

		this.setDate = this.setDate.bind(this);
		this.increaseByOne = this.increaseByOne.bind(this);
		this.decreaseByOne = this.decreaseByOne.bind(this);
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


	
	render(){
		console.log(this.state.amount);
		 const options = [
			"Koekäyttö", "Sijaislaite (maksullinen)", "Sijaislaite (maksuton)"
		];

		return(
		<div>
			<Menu />
			<button id="scan_button">Skannaa</button>
			<input name="employee_name" placeholder="Tuotteen varastosta hakija" defaultValue={this.state.user}/>
			<br/>
			<input name="customer_name" placeholder="Asiakas" />
			<br/>
			<input name="customer_number" placeholder="Asiakkaan puhelinnumero" />
			<br/>
			<input name="current_date" placeholder="Päivämäärä tänään" defaultValue={this.state.date}/>
			<br/>
			<input name="expiration" placeholder="Palautuspäivämäärä" />
			<br/>


			<br/>
			<br/>
			<S/>
			<button onClick={this.decreaseByOne}>-</button>
			<input name="amount" placeholder="Lukumäärä" onChange={this.increaseByOne} value={this.state.amount}/>
			<button onClick={this.increaseByOne} value={1}>+</button>
			<br/>
			<button>Lisää tuote</button>
			<br/>
			<button>Poista tuote</button>
			<br/>


			<br/>
			<Dropdown
        options={options}
        changeHandler={this.props.sizeChange}
        placeholder={"Lainauksen luonne"} />
			<input name="price" placeholder="Hinta" />
			<br/>

			<button>Lisää</button>
			<Calendar format='DD/MM/YYYY' date={this.state.date} />
			


			
		</div>);
	}

}
export default LendAndReturn;
