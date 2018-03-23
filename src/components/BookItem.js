import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


let a = {
	booking:[]
	
}


class BookItem extends Component{

	constructor(props){
		super(props);
		this.state ={
			customer: "",
			startDate: moment(),
      returnDate: moment(),
      start: "",
      return: "",
      item: "",
      list: a,
      x: "",
		}

		this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.returnDateChangeHandler = this.returnDateChangeHandler.bind(this);
    this.customerChangeHandler = this.customerChangeHandler.bind(this);
    this.addBooking = this.addBooking.bind(this);
    this.itemChangeHandler = this.itemChangeHandler.bind(this);
	}
	
	componentWillMount(){
		this.setState({
      start: moment().format().substring(0,10)
    });
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

  customerChangeHandler(evt){
  	this.setState({customer: evt.target.value });
  }

  addBooking(){

  	let obj = this.state.list;

  	obj['booking'].push({
  		"item":this.state.item,
			"start":this.state.start,
			"return":this.state.return,
			"customer":this.state.customer,
		});

  	console.log(obj);

  	this.setState({
  		list: obj,
  	})
  }

  itemChangeHandler(evt){
  	this.setState({
  		item: evt.target.value
  	});
  }

	render(){
		return(
		<div>
			<Menu />
			<input name="customer" placeholder="Asiakas" onChange={this.customerChangeHandler}/>
			<input name="item" placeholder="tuote" onChange={this.itemChangeHandler}/>

			<DatePicker
	      selected={this.state.startDate}
	      onChange={this.startDateChangeHandler} />

	    <DatePicker
	      selected={this.state.returnDate}
	      onChange={this.returnDateChangeHandler} />
	    <button onClick={this.addBooking}>Lisää varaus</button>



	    <ul>
	      {this.state.list.booking.map((booking, index)=>
        	<li key={index}>
           
            <p>{booking.customer}</p>
        	</li>
	      )}
      </ul>

		</div>);
	}

}
export default BookItem;
