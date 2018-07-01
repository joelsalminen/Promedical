import React from 'react';

const DocumentView = (props) => {
	const { doc } = props;

	return (
		<div>
			<h2>ProMecial</h2>
			<table>
				<tbody>
					<tr>
						<td>Asiakkaan nimi</td><td></td>
					</tr>

					<tr>
						<td>Lainaajan nimi</td><td>{doc.lender}</td>
					</tr>

					<tr>
						<td>Lainattavat tuotteet</td><td>items</td>
					</tr>

					<tr>
						<td>Lainauksen luonne</td><td>{doc.lendType}</td>
					</tr>

					<tr>
						<td>Laina-aika</td><td>{doc.startDate} - {doc.returnDate}</td>
					</tr>
				</tbody>
			</table>
			<p>*Tähän kohtaan tulee vakiomuotoinen vastuulauseke*</p>
			<p>Paikka ja päivämäärä</p>
			<p>Helsinki, {doc.startDate}</p>
			<p>Allekirjoitukset</p>
			<p>___________________</p>
			<p>{doc.lender}, Promedical</p>
			<p>___________________</p>
			<p>{doc.customer}</p>


		</div>
	);
}

export default DocumentView;

/* Joel Salminen - joel.salminen@student.lut.fi */ 