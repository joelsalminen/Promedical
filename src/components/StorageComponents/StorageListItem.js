import React, {Component} from 'react';

// used when printing a list of all items (lent and in storage)
class StorageListItem extends Component{
	constructor(props){
		super(props)
		this.state = {
			isEditing: false
		}


	}

	onDeleteClick = ()=>{
		this.props.deleteItem(this.props.item);
	}

	onEditClick = ()=>{
		this.setState({isEditing: true});
	}

	onSaveClick = ()=>{
		this.setState({isEditing: false})
	}

	onCancelClick = ()=>{
		this.setState({isEditing: false})
	}

	/* Render buttons in items table */
	renderActionSection(){
		/* Editing buttons */
		if (this.state.isEditing){
			return (
				<td>
					<button onClick={this.onSaveClick}>Tallenna</button>
					<button onClick={this.onCancelClick}>Peruuta</button>
				</td>
			);
		}

		/* Default buttons */
		return (
			<td>
				<button onClick={this.onEditClick}>Muokkaa</button>
				<button onClick={this.onDeleteClick}>Poista</button>
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
						<form>
							<input defaultValue={this.props.item.name}></input>
							
						</form>
					</td>
				);
			}
			/* Items not in storage */
			return (
					<td className="ReservationListItem" key={this.props.item._id}>
						{this.props.item.name} - 
						{this.props.item.serial}
					</td>
			);
		}

		/* Regular state */
		/* items that are in storage */
		if (this.props.item.inStorage === true){
			return(
					<td>{this.props.item.name} - {this.props.item.serial}

					</td>
			);
		}

		/* items that are with customers */
		else {
			return(
				<td className="ReservationListItem">
					{this.props.item.name} - 
					{this.props.item.serial} - 
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