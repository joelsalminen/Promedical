import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";
import SuggestionList from "./MainComponents/SuggestionList";

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


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
      list: {booking: []},
      items: {item: []},
      toBook: []
		}

		this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.returnDateChangeHandler = this.returnDateChangeHandler.bind(this);
    this.customerChangeHandler = this.customerChangeHandler.bind(this);
    this.addBooking = this.addBooking.bind(this);
    this.itemChangeHandler = this.itemChangeHandler.bind(this);
    this.filterItems = this.filterItems.bind(this);
    this.suggestionClickHandler = this.suggestionClickHandler.bind(this);
	}
	
	componentWillMount(){
		this.setState({
      start: moment().format().substring(0,10)
    });
	}

  componentDidMount(){
    setTimeout(()=>{
      this.setState({items: this.props.items});
    }, 500);
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
  		"items":this.state.toBook,
			"start":this.state.start,
			"return":this.state.return,
			"customer":this.state.customer,
		});


  	this.setState({
  		list: obj,
  	})


  	this.setState({
      start: moment().format().substring(0,10),
      return: moment().format().substring(0,10),
      item: "",
      customer: "",
    });
  }

  itemChangeHandler(evt){
  	this.setState({
  		item: evt.target.value
  	});
  }

  filterItems(items){
    items = items.item.slice();
    items = items.filter((item)=> item.name.indexOf(this.state.item) !== -1);
    //items = items.filter((item)=> item.location.indexOf("varasto") !== -1);
    if (this.state.item === ""){
      return [];
    }
    return items;
  }

  suggestionClickHandler(item){
    let list = this.state.toBook;
    list.push(item);
    this.setState({
      toBook: list
    });

  }

	render(){

    let itemsList = this.filterItems(this.state.items);

		return(
		<div id="BookItemMenu">
			<Menu />

      <h1>Varaus</h1>
      <p>Asiakas:</p>
			<input value={this.state.customer} name="customer" placeholder="Asiakas" onChange={this.customerChangeHandler}/>

      <p>Varattava tuote</p>
			<input value={this.state.item} name="item" placeholder="tuote" onChange={this.itemChangeHandler}/>

      <ul>
        {itemsList.map((item, index)=> <SuggestionList key={index} item={item} clickAction={this.suggestionClickHandler}/>)}
      </ul>

      <p>Lainauspäivä:</p>
			<DatePicker
	      selected={this.state.startDate}
	      onChange={this.startDateChangeHandler} />

      <p>Palautuspäivä:</p>
	    <DatePicker
	      selected={this.state.returnDate}
	      onChange={this.returnDateChangeHandler} />
	    <button className="SubmitButton" onClick={this.addBooking}>Lisää varaus</button>



	    <ul id="BookingList">
	      {this.state.list.booking.map((booking, index)=>
        	<li key={index}>
           
            <p>Customer: {booking.customer}</p>

            <ul>
              {booking.items.map((item, index)=> <li className="BookingList" key={index}>{item.name}</li>)}
            </ul>

            <p>{booking.start} - {booking.return}</p>
        	</li>
	      )}
      </ul>

		</div>);
	}

}
export default BookItem;
