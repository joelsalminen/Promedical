import React from 'react';
import { Link } from 'react-router-dom'

const DocumentListItem = (props) => {
	const {
		startDate, 
		lender
	} = props;
	return (
		<li><Link to='dokumenttinakyma'>{startDate}: {lender}</Link></li>
	);
}

export default DocumentListItem;