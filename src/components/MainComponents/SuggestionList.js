import React, { Component } from 'react';


/* Prints suggestion list items */
class SuggestionList extends Component{
	handleClick = () => {
		this.props.clickAction(this.props.item);
	}

	render(){
		return(
			<li className="ItemSuggestion" onClick={this.handleClick} key={this.props.item._id}>{this.props.item.name} {this.props.item.serial}</li>
		);
	}
}

export default SuggestionList;

/* Joel Salminen - joel.salminen@student.lut */