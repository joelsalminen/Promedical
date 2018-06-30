import React, {Component} from 'react';

import './StorageListItem.css';

// used when printing a list of all items (lent and in storage)
class StorageListItem extends Component{
	constructor(props){
		super(props)
		this.state = {
			isEditing: false,
			name: this.props.item.name
		}

		this.onNameChange = this.onNameChange.bind(this);
		this.onSerialChange = this.onSerialChange.bind(this);
		this.onEditClick = this.onEditClick.bind(this);
		this.onCancelClick = this.onCancelClick.bind(this);
		this.onSaveClick = this.onSaveClick.bind(this);
		this.onDeleteClick = this.onDeleteClick.bind(this);
		this.onEditLendingClick = this.onEditLendingClick.bind(this);


	}


	/* Sets the cursor to the end of the input field when edit
	button is clicked */
	onInputFocus (evt){
		const value = evt.target.value;
		evt.target.value = '';
		evt.target.value = value;
	}


	onDeleteClick(){
		this.props.deleteItem(this.props.item);
	}


	onEditClick(){
		this.setState({isEditing: true});
	}

	onEditLendingClick(){
		this.props.editLending(this.props.item);
	}


	onSaveClick(evt){
		evt.preventDefault();
		const oldItem = this.props.item;
		const newItem = {
			name: this.state.name,
			serial: this.state.serial
		};
		this.props.saveItem(oldItem, newItem);
		this.setState({isEditing: false});
	}


	onCancelClick(){
		this.setState({isEditing: false})
	}


	onNameChange(evt){
		this.setState({name: evt.target.value});
	}

	onSerialChange(evt){
		this.setState({ serial: evt.target.value });
	}

	/* Render buttons */
	renderActionSection(){
		/* Editing buttons */
		if (this.state.isEditing){
			if (this.props.item.inStorage){
				return (
					<div>
						<button 
							onClick={this.onSaveClick}
							className="Buttons__Button"
						>
							Tallenna
						</button>
						<button 
							onClick={this.onCancelClick} 
							className="Buttons__Button"
						>
							Peruuta
						</button>
					</div>
				);
			}
			return(
				<div>
					<button onClick={this.onCancelClick}>Peruuta</button>
				</div>
				
			);

		}


		/* Default buttons */
		/* items in storage */
		if(this.props.item.inStorage){
			return(
				<div className="StorageListItem__Buttons">
					<button 
						onClick={this.onEditClick}
						className="Buttons__Button--edit Buttons__Button"
					>
						Muokkaa
					</button>
					<button 
						onClick={this.onDeleteClick}
						className="Buttons__Button--delete Buttons__Button"
					>
						Poista
					</button>
				</div>

			);
		}
		/* items not in storage */
		return(
			<div className="List__lending--right">
				<button 
					onClick={this.onEditLendingClick}
					className="Buttons__Button Buttons__wideButton"
				>
					Muokkaa
				</button>
			</div>
		);

	}

	renderItems(){

		/* Editing state */
		if (this.state.isEditing === true){

			/* Items in storage */
			if (this.props.item.inStorage === true){

				return(
					<div className="EditBox inputFields">
						<form onSubmit={this.onSaveClick}>
							<input 
								autoFocus 
								onChange={this.onNameChange} 
								defaultValue={this.props.item.name}
								onFocus={this.onInputFocus}
							/>
							<input 
								onChange={this.onSerialChange}
								defaultValue={this.props.item.serial}
							/>

							
						</form>
					</div>
				);
			}
			/* Items not in storage */
			return (
					<div className="EditBox--right">
						<form onSubmit={this.onSaveClick}>
							<input 
								autoFocus 
								onChange={this.onNameChange} 
								defaultValue={this.props.item.item.name}
								onFocus={this.onInputFocus}
							/>

							
						</form>
					</div>
			);
		}

		/* Default state */
		/* items in storage */
		if (this.props.item.inStorage === true){
			return(
					<div className="StorageListItem__content">
						<p>Nimi: {this.props.item.name}</p>
						<p>Sarjanumero: {this.props.item.serial}</p>
					</div>
			);
		}

		/* items not in storage */
		else {
			return(
				<div className="StorageListItem__content">
					<p>Nimi: {this.props.item.item.name}</p>
					<p>Sarjanumero: {this.props.item.item.serial}</p>
					<p>Asiakas: {this.props.item.customer}</p>
					<p>Yhteystiedot: {this.props.item.contactInfo}</p>
					
				</div>
			);
		}
	}



	render(){
		return(
			<li key={this.props.item._id} className="StorageListItem">
				{this.renderItems()}
				{this.renderActionSection()}
			</li>

		);
		}

	}



export default StorageListItem;

// Joel Salminen - joel.salminen@student.lut.fi