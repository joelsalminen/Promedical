import Menu from "./MainComponents/MainMenuButton";
import React, { Component } from 'react';


class LendAndReturn extends Component{
	
	
	render(){
		return(
		<div>
			<Menu />
			<button id="scan_button">Skannaa</button>
			<input name="employee_name" placeholder="Tuotteen varastosta hakija" />
			<br/>
			<input name="customer_name" placeholder="Asiakas" />
			<br/>
			<input name="customer_number" placeholder="Asiakkaan puhelinnumero" />
			<br/>
			<input name="current_date" placeholder="Päivämäärä tänään" />
			<br/>
			<input name="expiration" placeholder="Palautuspäivämäärä" />
			<br/>


			<br/>
			<br/>
			<input name="name" placeholder="Tuotteen nimi" />
			<br/>
			<input name="serial_number" placeholder="Sarjanumero" />
			<br/>
			<button>-</button>
			<input name="amount" placeholder="Lukumäärä" />
			<button>+</button>
			<br/>
			<button>Lisää tuote</button>
			<br/>
			<button>Poista tuote</button>
			<br/>


			<br/>
			<input name="lending_type" placeholder="Lainauksen luonne" />
			<br/>
			<input name="price" placeholder="Hinta" />
			<br/>

			<button>Lisää</button>

		</div>);
	}

}
export default LendAndReturn;
