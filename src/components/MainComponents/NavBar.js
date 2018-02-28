import React from "react";
import { Link } from 'react-router-dom'

const NavBar = (props) =>
	<nav>
		<div>
			<ul>
				<li><h1>Promedical</h1></li>
				<li><Link to="/lainausjapalautus">Vuokraus ja palautus</Link></li>
				<li><Link to="/varaus">Varaus</Link></li>
				<li><Link to="/lisaatuote">Lisää tuote</Link></li>
				<li><Link to="/varasto">Varasto</Link></li>
				<li><Link to="/eraantyneet">Erääntyneet tuotteet</Link></li>
				<li><Link to="/inventaario">Inventaario</Link></li>
				<li><Link to="/historia">Historia</Link></li>
				


			</ul>
		</div>
	</nav>;

export default NavBar;