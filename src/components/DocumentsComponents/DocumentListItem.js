import React, { Component } from 'react';

import './DocumentListItem.css';

class DocumentListItem extends Component {

	onDocumentClick = () => {
		this.props.showDocument(this.props.doc)
	}

	render(){
		const { doc } = this.props;


		return (
			<li className="DocumentListItem">
				<div onClick={this.onDocumentClick}>{doc.startDate}: {doc.customer}</div>
			</li>
		);
	}



}

export default DocumentListItem;

/* Joel Salminen - joel.salminen@student.lut.fi */ 