import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './DocumentListItem.css';

class DocumentListItem extends Component {
	render(){
		const { document } = this.props;
		return (
			<li className="DocumentListItem">
				<Link to='dokumenttinakyma'>
					<p>{document.startDate}: {document.lender}</p>
				</Link>
			</li>
		);
	}

}

export default DocumentListItem;

/* Joel Salminen - joel.salminen@student.lut.fi */ 