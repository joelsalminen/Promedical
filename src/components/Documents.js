import React, { Component } from 'react';
import axios from 'axios';

import MainMenuButton from './MainComponents/MainMenuButton.js';
import DocumentList from './DocumentsComponents/DocumentList.js';
import DocumentFilter from './DocumentsComponents/DocumentFilter.js';
import DocumentView from './DocumentsComponents/DocumentView.js';

class Documents extends Component {
	state = {
		documents: [],
		showDocument: false,
		doc: {}
	}

	toggleShowDocument = (doc) => {
		this.setState(prevState => ({
			showDocument: !prevState.showDocument,
			doc
		}));
	}


	filterDocuments = (value) => {
		console.log(value)
	}


	componentDidMount(){
		const data = {
			customer: 'customer',
			contactInfo: 'customerInfo',
			lender: 'lender',
			lendType: 'lendType',
			price: 'price',
			startDate: 'startDate',
			returnData: 'returnDate',
		}
		
		const url = '/api/documents/';
		axios.get(url, data)
			.then(res => {
				this.setState({ documents: res.data })
			});


	}

	render(){
		const { documents, showDocument, doc } = this.state;
		return(
			<div>
				<MainMenuButton />
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
						<div>
							<DocumentFilter 
								documents={documents}
								filterDocuments={this.filterDocuments}
							/>
							<DocumentList 
								documents={documents}
								toggleShowDocument={this.toggleShowDocument}
							/>
						</div>
				)}

			</div>
		);
	}
}

export default Documents;

/* Joel Salminen - joel.salminen@student.lut.fi */ 
