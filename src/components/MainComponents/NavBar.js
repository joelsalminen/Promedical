import React from "react";
import { Link } from 'react-router-dom'

const NavBar = (props) =>
	<nav>
		<div>
			<ul>
				<li><h1>Promedical</h1></li>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/lend">Vuokraus ja palautus</Link></li>
				<li><Link to="/">Varaus</Link></li>
				<li><Link to="/">Lisää tuote</Link></li>
				<li><Link to="/">Varasto</Link></li>
				<li><Link to="/">Erääntyneet tuotteet</Link></li>
				<li><Link to="/">Inventaario</Link></li>
				<li><Link to="/">Historia</Link></li>

			</ul>
		</div>
	</nav>;

export default NavBar;