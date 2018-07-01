import React, { Component } from 'react';

import './DocumentListItem.css';

class DocumentListItem extends Component {
	render(){
		const { document } = this.props;
		return (
			<li className="DocumentListItem">
					<p>{document.startDate}: {document.lender}</p>
			</li>
		);
	}

}

export default DocumentListItem;

/* Joel Salminen - joel.salminen@student.lut.fi */ 