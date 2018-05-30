import React from "react";
import { Link } from 'react-router-dom'

/* Display Main menu */
const NavBar = (props) =>
	<nav>
		<div id="MainMenu">
			<h1 id="MenuTitle">Promedical</h1>
			<ul id="MenuList">
				
				<li><Link to="/lainaus">Lainaus</Link></li>
				<li><Link to="/palautus">Palautus</Link></li>
				<li><Link to="/varaus">Varaus</Link></li>
				<li><Link to="/lisaatuote">Lisää tuote</Link></li>
				<li><Link to="/varasto">Varasto</Link></li>

			</ul>
		</div>
	</nav>;

export default NavBar;

/* Joel Salminen - joel.salminen@student.lut.fi */
