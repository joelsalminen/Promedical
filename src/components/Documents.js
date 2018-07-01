import React, { Component } from 'react';
import axios from 'axios';

import MainMenuButton from './MainComponents/MainMenuButton.js';
import DocumentList from './DocumentsComponents/DocumentList.js';
import DocumentView from './DocumentsComponents/DocumentView.js';

class Documents extends Component {
	state = {
		documents: [],
		inputValue: '',
		showDocument: false,
		doc: {}
	}

	toggleShowDocument = (doc) => {
		this.setState(prevState => ({
			showDocument: !prevState.showDocument,
			doc
		}));
	}


	filterDocuments = () => {
		const { documents, inputValue } = this.state;
		const filteredDocuments = documents.filter(doc => 
			doc.customer.indexOf(inputValue) !== -1
		);
		return filteredDocuments;

	}

	onInputChange = (evt) => {
		this.setState({ inputValue: evt.target.value })
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
		const { 
			showDocument, 
			doc 
		} = this.state;

		const filteredDocuments = this.filterDocuments();
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
							<input 
								onChange={this.onInputChange}
								value={this.state.inputValue}
								placeholder="haku"
							/>
							<DocumentList 
								documents={filteredDocuments}
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
