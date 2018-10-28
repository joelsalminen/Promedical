import React, { Component }from 'react';

import $ from 'jquery';
import Menu from './MainComponents/MainMenuButton';
import SuggestionList from "./MainComponents/SuggestionList";

import "./DeleteItem.css";

class DeleteItem extends Component {

	constructor(props){
		super(props);
		this.state = {
			items: [],
			showList: false,
			toReserve: []
		};

		this.onToReserveItemClick = this.onToReserveItemClick.bind(this);
	}




	componentDidMount(){
    /* Fetch item data from backend*/
    $.ajax({
      url: 'api/items',
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      method: 'get',
      success: (res)=>{this.setState({items: res})}
    });
  }





  onSuggestionClick = (toReserveItem) => {
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

  onToReserveItemClick = (itemToRemove) => {
  	// return;

    const newToReserve = this.state.toReserve.filter(item => 
      {return item._id !== itemToRemove._idt;}
    );
    const newItems = this.state.items.map(item => Object.assign({}, item));
    newItems.push(itemToRemove);
    this.setState({ toReserve: newToReserve, items: newItems });
  }


  onDeleteItems = () =>{
  	const { toReserve } = this.state;
  	toReserve.forEach(item => {
  		$.ajax({
	  		url: '/api/items/' + item._id,
				method: 'delete',
				headers: {
	        'Authorization': localStorage.getItem('token')
	      },
				success: ((res)=>{
					this.setState({
						toReserve: []
					});
					console.log(res);
				})
  		});
  	});
  }

	render(){
		const itemsList = this.state.items;
		const showList = this.state.showList;
		const toReserve = this.state.toReserve;
		console.log()

		const emptyParagraph = 
	    <p 
	      style={{fontWeight: 'bold', margin: '0.5em'}}
	    > 
	      ---tyhjä--- 
	    </p>

		return (
			<div className="DeleteItem">
				<Menu />
				
					<h1 className="DeleteItem__header PageHeader">PoistaTuote</h1>

					<div className="suggestionButton__container">
		        <button 
		          className="SuggestionItem__suggestionButton SuggestionItem__suggestionButton--lend"
		          onClick={this.onSuggestionButtonClick}
		        >
		          {showList ? 'Piilota tuotelista': 'Näytä tuotelista'}
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
		              onClick={() => this.onToReserveItemClick(item)}
		            >
		              <p>{item.name}</p>
		              <p>{item.serial}</p>
		            </li>
		          )}

		        </ul>
		      </div>

				
					<button className="bottomButton" onClick={this.onDeleteItems}>Poista tuotteet</button>

			</div>
		);
	}

}

export default DeleteItem;