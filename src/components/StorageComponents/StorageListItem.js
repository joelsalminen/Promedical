import React, {Component} from 'react';

// used when printing a list of all items (lent and in storage)
class StorageListItem extends Component{
	// constructor(props){
	// 	super(props)
	// }
	render(){
		// items that are in storage
		if (this.props.item.inStorage === false){
			return(

				<li key={this.props.index}>{this.props.item.name} - {this.props.item.serial} - {this.props.item.location} - {this.props.item.expiration} -{this.props.item.customer}--<button>Muokkaa</button></li>
			);
		}

		// items that are with customers
		else {
			return(

				<li key={this.props.index}> {this.props.item.name} - {this.props.item.serial} - {this.props.item.location} - {this.props.item.expiration} -{this.props.item.customer}--<button>Muokkaa</button></li>
			);
			}
		}

	}



export default StorageListItem;

// Joel Salminen - joel.salminen@student.lut.fi