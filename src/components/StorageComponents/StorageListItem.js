import React, {Component} from 'react';

class StorageListItem extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<li key={this.props.index}>{this.props.item.name} - {this.props.item.serial} - {this.props.item.location} - {this.props.item.expiration} ---<button>Muokkaa</button></li>
		);
	}
}


export default StorageListItem;