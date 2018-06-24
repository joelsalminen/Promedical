import React, {Component} from 'react';

// used when printing a list of all items (lent and in storage)
class StorageListItem extends Component{
	constructor(props){
		super(props)
		this.state = {
			isEditing: false,
			name: this.props.item.name
		}

		this.onNameChange = this.onNameChange.bind(this);
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


	/* Render buttons */
	renderActionSection(){
		/* Editing buttons */
		if (this.state.isEditing){
			if (this.props.item.inStorage){
				return (
					<td>
						<button onClick={this.onSaveClick}>Tallenna</button>
						<button onClick={this.onCancelClick}>Peruuta</button>
					</td>
				);
			}
			return(
				<td>
					<button onClick={this.onCancelClick}>Peruuta</button>
				</td>
				
			);

		}


		/* Default buttons */
		/* items in storage */
		if(this.props.item.inStorage){
			return(
				<td>
					<button onClick={this.onEditClick}>Muokkaa</button>
					<button onClick={this.onDeleteClick}>Poista</button>
				</td>

			);
		}
		/* items not in storage */
		return(
			<td>
				<button onClick={this.onEditLendingClick}>Muokkaa</button>
			</td>
		);

	}

	renderItems(){

		/* Editing state */
		if (this.state.isEditing === true){

			/* Items in storage */
			if (this.props.item.inStorage === true){

				return(
					<td>
						<form onSubmit={this.onSaveClick}>
							<input 
								autoFocus 
								onChange={this.onNameChange} 
								defaultValue={this.props.item.name}
								onFocus={this.onInputFocus}
							/>

							
						</form>
					</td>
				);
			}
			/* Items not in storage */
			return (
					<td className="ReservationListItem" key={this.props.item._id}>
						<form onSubmit={this.onSaveClick}>
							<input 
								autoFocus 
								onChange={this.onNameChange} 
								defaultValue={this.props.item.item.name}
								onFocus={this.onInputFocus}
							/>

							
						</form>
					</td>
			);
		}

		/* Default state */
		/* items in storage */
		if (this.props.item.inStorage === true){
			return(
					<td>{this.props.item.name} - {this.props.item.serial}

					</td>
			);
		}

		/* items not in storage */
		else {
			return(
				<td className="ReservationListItem">
					{this.props.item.item.name} - 
					{this.props.item.item.serial} - 
					{this.props.item.customer}
				</td>
			);
		}
	}



	render(){
		return(
			<tr>
				{this.renderItems()}
				{this.renderActionSection()}
			</tr>

		);
		}

	}



export default StorageListItem;

// Joel Salminen - joel.salminen@student.lut.fi