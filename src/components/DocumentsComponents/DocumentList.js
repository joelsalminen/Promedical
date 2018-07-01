import React, { Component } from 'react';

import DocumentListItem from './DocumentListItem.js';
import DocumentView from './DocumentView.js';

import './DocumentList.css';

class DocumentList extends Component {


	toggleShowDocument = (doc) => {
		this.props.toggleShowDocument(doc);
		// this.setState(prevState => ({
		// 	showDocument: !prevState.showDocument,
		// 	doc
		// }));
	}

	renderDocumentListItems = () => {
		const { documents } = this.props;
		return (documents.map(doc => 
			<DocumentListItem 
				key={doc._id}
				doc={doc}
				showDocument={this.toggleShowDocument}
			/>
		));
	}

	render(){

		return (


			<ul className="DocumentList">
				{this.renderDocumentListItems()}
			</ul>


		);
	}

}

export default DocumentList;

/* Joel Salminen - joel.salminen@student.lut.fi */ 