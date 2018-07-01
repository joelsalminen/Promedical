import React, { Component } from 'react';
import axios from 'axios';

import MainMenuButton from './MainComponents/MainMenuButton.js';
import DocumentList from './DocumentsComponents/DocumentList.js';
import DocumentFilter from './DocumentsComponents/DocumentFilter.js';

class Documents extends Component {
	state = {
		documents: []
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
		const { documents } = this.state;
		return(
			<div>
				<MainMenuButton />
				<DocumentFilter 
					documents={documents}
					filterDocuments={this.filterDocuments}
				/>
				<DocumentList 
					documents={documents}
				/>
			</div>
		);
	}
}

export default Documents;

/* Joel Salminen - joel.salminen@student.lut.fi */ 