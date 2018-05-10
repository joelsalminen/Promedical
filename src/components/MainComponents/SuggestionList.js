import React, { Component } from 'react';

class SuggestionList extends Component{
	handleClick = () => {
		this.props.clickAction(this.props.item.name);
	}

	render(){
		return(
			<li className="ItemSuggestion" onClick={this.handleClick} key={this.props.index}>{this.props.item.name} {this.props.item.serial}</li>
		);
	}
}


export default SuggestionList;