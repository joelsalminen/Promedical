import React, { Component } from 'react';
import axios from 'axios';

import MainMenuButton from './MainComponents/MainMenuButton.js';
import DocumentList from './DocumentsComponents/DocumentList.js';

class Documents extends Component {
	state = {
		documents: []
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
		
		console.log(data);
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
				<DocumentList 
					documents={documents}
				/>
			</div>
		);
	}
}

export default Documents;

/* Joel Salminen - joel.salminen@student.lut.fi */ 