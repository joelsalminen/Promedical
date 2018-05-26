import React, {Component} from 'react';

// used when printing a list of all items (lent and in storage)
class StorageListItem extends Component{
	// constructor(props){
	// 	super(props)
	// }

	onDeleteClick = ()=>{
		this.props.deleteItem(this.props.item);
	}

	onEditClick = ()=>{
		this.props.editItem(this.props.item);
	}


	render(){
		// items that are in storage
		if (this.props.item.inStorage === true){
			return(

				<li key={this.props.item._id}>{this.props.item.name} - {this.props.item.serial} <button onClick={this.onEditClick}>Muokkaa</button><button onClick={this.onDeleteClick}>Poista</button></li>
			);
		}

		// items that are with customers
		else {
			return(
				<li className="NotInStorage" key={this.props.item._id}> {this.props.item.name} - {this.props.item.serial} - {this.props.item.customer} <button onClick={this.onEditClick}>Muokkaa</button></li>
			);
			}
		}

	}



export default StorageListItem;

// Joel Salminen - joel.salminen@student.lut.fi