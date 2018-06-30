import React, { Component } from 'react';
import Menu from "./MainComponents/MainMenuButton";
import SuggestionList from "./MainComponents/SuggestionList";
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './ReserveItem.css';

/* Documents reservation information */
class ReserveItem extends Component{

	constructor(props){
		super(props);
		this.state ={
			customer: "",
			startDate: moment(),
      returnDate: moment().add(7, 'days'),
      start: "",
      return: "",
      item: "",
      reservations: [],
      items: [],
      toReserve: [],
      showList: true,
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
      start: moment().format().substring(0,10),
      return: moment().add(7, 'days').format().substring(0,10)
    });

    /* Fetch item data from backend*/
    $.ajax({
      url: 'api/items',
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      method: 'get',
      success: (res)=>{this.setState({items: res})}
    });


    /* Fetch reservation data from backend */
    $.ajax({
      url: 'api/reservations/',
      method: 'get',
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      success: (reservations)=>{
        this.setState({
          reservations: reservations
        });
      }
    });

  }


  /* Filters items on a list based input data of Lend Item Name */
  filterItems(items){
    const { item } = this.state;
    let itemsList
    /* filter out items that don't include the same data that is in this.state.itemName */
    itemsList = items.filter(object => {
      const data = object.serial.toString() + object.name;
      return data.indexOf(item) !== -1
    });
    return itemsList;

  }

  onDeleteReservation(reservation){
    /* Fetch item data from backend*/
    $.ajax({
      url: 'api/reservations/' + reservation._id,
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      method: 'delete',
      success: (res)=>{
        const { reservations } = this.state;
        let newReservations = reservations.map(reservation => Object.assign({}, reservation));
        newReservations = newReservations.filter(reservation => reservation._id !== res._id);
        this.setState({ reservations: newReservations });
      }
    });
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
        headers: {
          'Authorization': localStorage.getItem('token')
        },
        data: reservationData,
        success: ((res)=>{
          /* Adding reservation to the webpage */
          let list = this.state.reservations;

          list.push({
            item: res.item,
            startDate: res.startDate,
            returnDate: res.returnDate,
            customer: res.customer,
          });

          // update reservation list, reset toReserve list
          this.setState({
            reservations: list
          });

        })
      });

    });
    // reset input fields
    this.setState({
      start: moment().format().substring(0,10),
      return: moment().add(7, 'days').format().substring(0,10),
      item: "",
      customer: "",
      startDate: moment(),
      returnDate: moment().add(7, 'days'),
      toReserve: []
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
  onSuggestionClick(toReserveItem){
    /* Add items to toReserve state */
    let toReserve = this.state.toReserve.map(item=>Object.assign({}, item));
    toReserve.push(toReserveItem);

    /* Remove item from items*/
    let items = this.state.items.map(item=>Object.assign({}, item));
    items = items.filter(item=>{return item._id !== toReserveItem._id});
    this.setState({items, toReserve});

  }
  onSuggestionButtonClick = () =>{
    this.setState(prevState => ({
      showList: !prevState.showList
    }));
  }

	render(){
    const itemsList = this.filterItems(this.state.items);
    // console.log(this.state.reservations);

    const { showList, toReserve } = this.state;

    const emptyParagraph = 
    <p 
      style={{fontWeight: 'bold', margin: '0.5em'}}
    > 
      ---tyhjä--- 
    </p>

		return(
		<div className="ReserveItem">
			<Menu />
      <h1 className="ReserveItem__header PageHeader">Varaus</h1>

      <div className="inputFields">
        <p>Asiakas:</p>
  			<input value={this.state.customer} name="customer" placeholder="Asiakas" onChange={this.onCustomerChange}/>

        <p>Varattava tuote</p>
  			<input value={this.state.item} name="item" placeholder="haku" onChange={this.onItemChange}/>

    {/* ---------------- Suggestions items list ----------------*/}
      <div className="suggestionButton__container">
        <button 
          className="SuggestionItem__suggestionButton SuggestionItem__suggestionButton--lend"
          onClick={this.onSuggestionButtonClick}
        >
          {showList ? 'Piilota': 'Näytä'}
        </button>
      </div>

        {showList && 
          <div className="LendItem__suggestionList">
            <p>Tuotteet:</p>
            {!(itemsList.length > 0) && emptyParagraph}
            <ul>
              {itemsList.map(item => <SuggestionList key={item._id} item={item} clickAction={this.onSuggestionClick} />)}
            </ul>
          </div>
        }

      {/* ---------------- toLend items list ----------------*/}
      <div className={showList ? "LendItem__toLendItems ret" : "LendItem__toLendItems--wide ret"}>
        <p>Varattavat:</p>
        {!(toReserve.length > 0) && emptyParagraph}
        <ul>
          {toReserve.map(item => 
            <li 
              key={item._id}
              className="toLendItem" 
            >
              <p>{item.name}</p>
              <p>{item.serial}</p>
            </li>
          )}

        </ul>
      </div>

      <div style={{clear: 'both'}}></div>
        <p>Lainauspäivä:</p>
  			<DatePicker
  	      selected={this.state.startDate}
  	      onChange={this.onStartDateChange} />

        <p>Palautuspäivä:</p>
  	    <DatePicker
  	      selected={this.state.returnDate}
  	      onChange={this.onReturnDateChange} />
      </div>
	    <button className="bottomButton" onClick={this.onAddReservationClick}>Lisää varaus</button>

    {/* Move this to a new component */ }
	    <ul className="Reservation__list">
	      {this.state.reservations.map((reservation, index)=>
        	<li className="ReservationItem__list__item" key={index}>
           <button 
            onClick={() => this.onDeleteReservation(reservation)}
          >
            x
           </button>
            <p>Customer: {reservation.customer}</p>

            <ul>
              <li key={index}>{reservation.item.name}</li>
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