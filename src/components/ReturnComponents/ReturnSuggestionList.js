import React, { Component } from 'react';


/* Prints suggestion list items */
class ReturnSuggestionList extends Component{
	handleClick = () => {
		this.props.clickAction(this.props.item);
	}

	render(){
		return(
			<li className="ItemSuggestion" onClick={this.handleClick} key={this.props.index}>{this.props.item.item.name} {this.props.item.item.serial}</li>
		);
	}
}

export default ReturnSuggestionList;

/* Joel Salminen - joel.salminen@student.lut */