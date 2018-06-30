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
			{lending.item.name}
		</li>
		);
	}
}

export default ToReturnList;