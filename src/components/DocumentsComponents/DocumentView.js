import React from 'react';

import './DocumentView.css';
import logo from '../../img/promedical-logo-jpg.jpg';

const DocumentView = (props) => {
	const { doc } = props;

	return (
		<div className="DocumentView">
			<img
				src={logo}
				alt="Promedical"
				className="DocumentView__logo"
			/>
			<table>
				<tbody>

					<tr>
						<td style={{fontWeight: 'bold'}}>Lainauksen suorittaja</td><td>{doc.lender}</td>
					</tr>

					<tr>
						<td style={{fontWeight: 'bold'}}>Lainaaja</td><td>{doc.customer}</td>
					</tr>

					<tr>
						<td style={{fontWeight: 'bold'}}>Lainattavat tuotteet</td><td>items</td>
					</tr>

					<tr>
						<td style={{fontWeight: 'bold'}}>Lainauksen luonne</td><td>{doc.lendType}</td>
					</tr>

					<tr>
						<td style={{fontWeight: 'bold'}}>Laina-aika</td><td>{doc.startDate} - {doc.returnDate}</td>
					</tr>
				</tbody>
			</table>
			<p className="DocumentView__responsibility">*Tähän kohtaan tulee vakiomuotoinen vastuulauseke*</p>
			<p style={{fontWeight: 'bold'}}>Paikka ja päivämäärä</p>
			<p>Helsinki, {doc.startDate}</p>
			<div className="DocumentView__signatures">
				<p className="DocumentView__signatureTitle">Allekirjoitukset</p>
				<div className="Signature--left Signature">
					<div className="Signature__line"></div>
					<p>{doc.lender}, Promedical</p>
				</div>
				<div className="Signature--right Signature">
					<div className="Signature__line"></div>
					<p>{doc.customer}</p>
				</div>

			</div>


		</div>
	);
}

export default DocumentView;

/* Joel Salminen - joel.salminen@student.lut.fi */ 