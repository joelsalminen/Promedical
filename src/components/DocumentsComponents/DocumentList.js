import React from 'react';

import DocumentListItem from './DocumentListItem.js';

const DocumentList = (props) => {
	const { documents } = props;
	return (
		<div>
			<ul className="DocumentList">
				{documents.map(document => 
					<DocumentListItem {...document}/>
				)}
			</ul>
		</div>
	);
}

export default DocumentList;