import React, { Component } from 'react';

class ToReturnList extends Component{

	handleClickAction = () => {;
		const { lending } = this.props;
		this.props.handleClick(lending);
	}

	render (){
		const { lending } = this.props;
		return(
			<li 
				onClick={this.handleClickAction} 
				className="toReturnItem" 
		>
			<p>{lending.item.name}</p>
			<p>{lending.item.serial}</p>
		</li>
		);
	}
}

export default ToReturnList;