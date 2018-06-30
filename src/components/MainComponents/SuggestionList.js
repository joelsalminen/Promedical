import React, { Component } from 'react';
import './SuggestionList.css';


/* Prints suggestion list items */
class SuggestionList extends Component{
	handleClick = () => {
		this.props.clickAction(this.props.item);
	}

	render(){
		return(
			<li 
				className="ItemSuggestion ItemSuggestion--lend" 
				onClick={this.handleClick} 
				key={this.props.item._id}
			>
				<p>{this.props.item.name}</p> 
				<p>{this.props.item.serial}</p>
			</li>
		);
	}
}

export default SuggestionList;

/* Joel Salminen - joel.salminen@student.lut */