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

	renderItems(){

		/* Editing state */
		if (this.state.isEditing === true){
			if (this.props.item.inStorage === true){
				return(
					<li key={this.props.item._id}> 
						<form>
							<input defaultValue={this.props.item.name}></input>
							<button onClick={this.onSaveClick}>Tallenna</button>
							<button onClick={this.onCancelClick}>Peruuta</button>
						</form>
					</li>
				);
			}

			return (
				<li key={this.props.item._id}>{this.props.item.name} - {this.props.item.serial} <button onClick={this.onSaveClick}>Tallenna</button><button onClick={this.onCancelClick}>Peruuta</button></li>
			);
		}

		/* Regular state */
		/* items that are in storage */
		if (this.props.item.inStorage === true){
			return(
				<li key={this.props.item._id}>{this.props.item.name} - {this.props.item.serial} <button onClick={this.onEditClick}>Muokkaa</button><button onClick={this.onDeleteClick}>Poista</button></li>
			);
		}

		/* items that are with customers */
		else {
			return(
				<li className="NotInStorage" key={this.props.item._id}> {this.props.item.name} - {this.props.item.serial} - {this.props.item.customer} <button onClick={this.onEditClick}>Muokkaa</button></li>
			);
		}


	}



	render(){
		return(
			<div>
				{this.renderItems()}
			</div>
		);
		}

	}



export default StorageListItem;

// Joel Salminen - joel.salminen@student.lut.fi