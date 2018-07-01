import React, { Component } from 'react';

import DocumentListItem from './DocumentListItem.js';
import DocumentView from './DocumentView.js';

import './DocumentList.css';

class DocumentList extends Component {
	state = {
		showDocument: false
	}

	toggleShowDocument = (doc) => {
		this.setState(prevState => ({
			showDocument: !prevState.showDocument,
			doc
		}));
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
		const { showDocument, doc } = this.state;

		return (
			<div>
				{showDocument ? (
						<div>
							<button onClick={this.toggleShowDocument}>
								Takaisin dokumentteihin
							</button>
							<DocumentView 
								doc={doc}
							/>
						</div>

					):(
						<ul className="DocumentList">
							{this.renderDocumentListItems()}
						</ul>
				)}


			</div>
		);
	}

}

export default DocumentList;

/* Joel Salminen - joel.salminen@student.lut.fi */ 