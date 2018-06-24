import React, { Component } from 'react';

class LendingEdit extends Component {
	state = {
		customer: '',
		contactInfo: '',
		startDate: '',
		returnDate: '',
		lendType: '',
		itemName: '',
		itemSerial: ''

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
	onItemNameChange = (evt) => {
		this.setState({ itemName: evt.target.value });
	}
	onItemSerialChange = (evt) => {
		this.setState({ itemSerial: evt.target.value });
	}


	componentDidMount(){
		const { lending } = this.props;

		this.setState({
			customer: lending.customer,
			contactInfo: lending.contactInfo,
			startDate: lending.startDate,
			returnDate: lending.returnDate,
			lendType: lending.lendType,
			itemName: lending.item.name,
			itemSerial: lending.item.serial
		});
	}

	render(){
		const { lending } = this.props;
		const { 
			customer,
			contactInfo,
			startDate,
			returnDate,
			lendType,
			itemName,
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
			{itemSerial}</p>

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


				<button>Tallenna</button>
				<button onClick={this.props.cancelEdit}>Peruuta</button>
			</div>
		);
	}
}

export default LendingEdit;