import React, { Component } from 'react';

class DocumentFilter extends Component {
	onInputChange = (evt) => {
		this.props.filterDocuments(evt.target.value)
	}

	render(){
		return (
			<input onChange={this.onInputChange}/>
		);
	}

}

export default DocumentFilter;