import React, { Component } from 'react';
import './ReturnSuggestionList.css';

/* Prints suggestion list items */
class ReturnSuggestionList extends Component{
	handleClick = () => {
		this.props.clickAction(this.props.item);
	}

	render(){
		return(
			<li 
				className="ItemSuggestion ItemSuggestion--return" 
				onClick={this.handleClick} 
				key={this.props.index}
			>
				<p>{this.props.item.item.name}</p> 
				<p>{this.props.item.item.serial}</p>
			</li>
		);
	}
}

export default ReturnSuggestionList;

/* Joel Salminen - joel.salminen@student.lut */