import React from 'react';
import { Link } from 'react-router-dom'

import './DocumentListItem.css';

const DocumentListItem = (props) => {
	const { document } = props;
	return (
		<li className="DocumentListItem">
			<Link to='dokumenttinakyma'>
				<p>{document.startDate}: {document.lender}</p>
			</Link>
		</li>
	);
}

export default DocumentListItem;

/* Joel Salminen - joel.salminen@student.lut.fi */ 