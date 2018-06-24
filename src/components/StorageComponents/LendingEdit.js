import React, { Component } from 'react';
import $ from 'jquery';

class LendingEdit extends Component {
	state = {
		lender: '',
		customer: '',
		contactInfo: '',
		startDate: '',
		returnDate: '',
		lendType: '',
		price: '',
		itemName: '',
		itemSerial: ''

	}

	onSaveChangesClick = () => {
		const { lending } = this.props;

		const { 
			lender,
			customer,
			contactInfo,
			startDate,
			returnDate,
			lendType,
			price,
			itemName,
			itemSerial
		} = this.state;

		const data = {
			_id: lending._id,
			lender,
			customer,
			contactInfo,
			startDate,
			returnDate,
			lendType,
			price,
			itemName,
			itemSerial
		};

		$.ajax({
			url: "api/lendings/" + lending._id,
			method: "put",
			headers: {
				"Authorization": localStorage.getItem("token")
			},
			data,
			success: (res => {
				this.props.updateItems(res);
			})
		});
		this.props.closeEdit();
	}

	onLenderChange = (evt) => {
		this.setState({ lender: evt.target.value });
	}
	onCustomerChange = (evt) => {
		this.setState({ customer: evt.target.value });
	}
	onContactInfoChange = (evt) => {
		this.setState({ contactInfo: evt.target.value });
	}
	onStartDateChange = (evt) => {
		this.setState({ startDate: evt.target.value });
	}
	onReturnDateChange = (evt) => {
		this.setState({ returnDate: evt.target.value });
	}
	onLendTypeChange = (evt) => {
		this.setState({ lendType: evt.target.value });
	}
	onPriceChange = (evt) => {
		this.setState({ price: evt.target.value });
	}
	onItemNameChange = (evt) => {
		this.setState({ itemName: evt.target.value });
	}
	onItemSerialChange = (evt) => {
		this.setState({ itemSerial: evt.target.value });
	}


	componentDidMount(){
		const { lending } = this.props;
		this.setState({
			lender: lending.lender,
			customer: lending.customer,
			contactInfo: lending.contactInfo,
			startDate: lending.startDate,
			returnDate: lending.returnDate,
			lendType: lending.lendType,
			price: lending.price,
			itemName: lending.item.name,
			itemSerial: lending.item.serial
		});
	}

	render(){
		const { 
			customer,
			contactInfo,
			startDate,
			returnDate,
			lendType,
			itemName,
			price,
			lender,
			itemSerial
		} = this.state;

		return (
			<div className="Items__dialog__inputContainer">
				<p>			{customer}
			{contactInfo}
			{startDate}
			{returnDate}
			{lendType}
			{itemName}
			{price}
			{lender}
			{itemSerial}</p>

				<label htmlFor='lender'>Lainaaja</label>
				<input
					value={lender} 
					onChange={this.onLenderChange}
				/>				
				<label htmlFor='customer'>Asiakas</label>
				<input
					value={customer} 
					onChange={this.onCustomerChange}
				/>
				<label htmlFor='customerInfo'>Asiakkaan yhteystiedot</label>
				<input
					type="text"
					value={contactInfo}
					onChange={this.onContactInfoChange}
				/>
				<label htmlFor='startDate'>Lainauspäivä</label>
				<input 
					value={startDate}
					onChange={this.onStartDateChange}
				/>
				<label htmlFor='returnDate'>Palautuspäivä</label>
				<input 
					value={returnDate}
					onChange={this.onReturnDateChange}
				/>
				<label htmlFor='lendType'>Lainauksen luonne</label>
				<input 
					value={lendType}
					onChange={this.onLendTypeChange}
				/>
				<label htmlFor='price'>Lainauksen hinta</label>
				<input 
					value={price}
					onChange={this.onPriceChange}
					disabled={lendType !== 'Sijaislaite (maksullinen)'}
				/>
				<label htmlFor='itemName'>Tuotteen nimi</label>
				<input 
					value={itemName}
					onChange={this.onItemNameChange}
				/>
				<label htmlFor='itemSerial'>Tuotteen sarjanumero</label>
				<input 
					value={itemSerial}
					onChange={this.onItemSerialChange}
				/>


				<button onClick={this.onSaveChangesClick}>Tallenna</button>
				<button onClick={this.props.closeEdit}>Peruuta</button>
			</div>
		);
	}
}

export default LendingEdit;