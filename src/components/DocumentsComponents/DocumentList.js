import React from 'react';

import DocumentListItem from './DocumentListItem.js';

import './DocumentList.css';

const DocumentList = (props) => {
	const { documents } = props;
	return (
		<div>
			<ul className="DocumentList">
				{documents.map(document => 
					<DocumentListItem 
						key={document._id}
						document={document}
					/>
				)}
			</ul>
		</div>
	);
}

export default DocumentList;

/* Joel Salminen - joel.salminen@student.lut.fi */ 