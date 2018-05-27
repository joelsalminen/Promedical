import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";
import SuggestionList from "./MainComponents/SuggestionList";
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

/* Documents reservation information */
class ReserveItem extends Component{

	constructor(props){
		super(props);
		this.state ={
			customer: "",
			startDate: moment(),
      returnDate: moment(),
      start: "",
      return: "",
      item: "",
      reservations: [],
      items: [],
      toReserve: [],
		}

    this.filterItems = this.filterItems.bind(this);

    this.onAddReservationClick = this.onAddReservationClick.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onReturnDateChange = this.onReturnDateChange.bind(this);
    this.onCustomerChange = this.onCustomerChange.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onSuggestionClick = this.onSuggestionClick.bind(this);
	}


  componentDidMount(){
    /* Initialize date data */
    this.setState({
      start: moment().format().substring(0,10)
    });

    /* Fetch item data from backend*/
    $.ajax({
      url: 'api/items',
      method: 'get',
      success: (res)=>{this.setState({items: res})}
    });


    /* Fetch reservation data from backend */
    $.ajax({
      url: 'api/reservations/',
      method: 'get',
      success: (reservations)=>{
        // place items into a list 
        reservations.forEach((reservation)=>{
          let r = reservation;
          r.items = [];
          r.items.push(reservation.item);
          delete r['item'];
        });
        
        
        this.setState({
          reservations: reservations
        });
      }
    });

  }


  /* Filters items on a list based input data of Lend Item Name */
  filterItems(items){
    //items = items.item.slice();
    items = items.filter((item)=> item.name.indexOf(this.state.item) !== -1);
    //items = items.filter((item)=> item.location.indexOf("varasto") !== -1);
    if (this.state.item === ""){
      return [];
    }
    return items;
  }


  onAddReservationClick(){
    /* collect reservation data */
    this.state.toReserve.forEach(item =>{
      let reservationData = {
        customer: this.state.customer,
        startDate: this.state.start,
        returnDate: this.state.return,
        itemName: item.name,
        itemSerial: item.serial,
        itemId: item._id
      }

      /* Save reservations into a database */
      $.ajax({
        url: 'api/reservations/',
        method: 'post',
        data: reservationData,
        success: ((res)=>{
          /* Adding reservation to the webpage */
          let list = this.state.reservations;

          list.push({
            items: this.state.toReserve,
            startDate: this.state.start,
            returnDate: this.state.return,
            customer: this.state.customer,
          });

          // update reservation list, reset toReserve list
          this.setState({
            reservations: list,
            toReserve: []
          });

          // reset input fields
          this.setState({
            start: moment().format().substring(0,10),
            return: moment().format().substring(0,10),
            item: "",
            customer: "",
          });
        })
      });

    });


          
  }


  /* Fired whenever Start Date field data changes */
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
    	returnDate: date
    });

    this.setState({
      return: date.format().substring(0,10)
    });
    
  }

  /* Fired whenever Customer field data changes */
  onCustomerChange(evt){
  	this.setState({customer: evt.target.value });
  }

  /* Fired whenever Item Name field data changes */
  onItemChange(evt){
    this.setState({
      item: evt.target.value
    });
  }


  /* Fired whenever suggested items on a list are clicked */
  onSuggestionClick(item){
    let list = this.state.toReserve;
    list.push(item);
    /* Add items to toLend state */
    this.setState({
      toReserve: list
    });

  }

	render(){

    let itemsList = this.filterItems(this.state.items);

		return(
		<div id="ReserveItemMenu">
			<Menu />
      <h1>Varaus</h1>

      <p>Asiakas:</p>
			<input value={this.state.customer} name="customer" placeholder="Asiakas" onChange={this.onCustomerChange}/>

      <p>Varattava tuote</p>
			<input value={this.state.item} name="item" placeholder="tuote" onChange={this.onItemChange}/>
      <ul>
        {itemsList.map((item, index)=> <SuggestionList key={index} item={item} clickAction={this.onSuggestionClick}/>)}
      </ul>

      <p>Lainauspäivä:</p>
			<DatePicker
	      selected={this.state.startDate}
	      onChange={this.onStartDateChange} />

      <p>Palautuspäivä:</p>
	    <DatePicker
	      selected={this.state.returnDate}
	      onChange={this.onReturnDateChange} />
	    <button className="SubmitButton" onClick={this.onAddReservationClick}>Lisää varaus</button>

    {/* Move this to a new component */ }
	    <ul id="ReservationList">
	      {this.state.reservations.map((reservation, index)=>
        	<li key={index}>
           
            <p>Customer: {reservation.customer}</p>

            <ul>
              {reservation.items.map((item, index)=> <li className="ReservationListItem" key={index}>{item.name}</li>)}
            </ul>

            <p>{reservation.startDate} - {reservation.returnDate}</p>
        	</li>
	      )}
      </ul>

		</div>);
	}

}
export default ReserveItem;

/* Joel Salminen - joel.salminen@student.lut.fi */