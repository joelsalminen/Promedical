import React, { Component } from 'react';

class SuggestionList extends Component{
	handleClick = () => {
		this.props.onClickAction(this.props.item.name);
	}

	render(){
		return(
			<li className="ItemSuggestion" onClick={this.handleClick} key={this.props.index}>{this.props.item.name} </li>
		);
	}
}


export default SuggestionList;