import React, {Component} from "react";
import { Link } from 'react-router-dom';

/* Display Main menu */
class NavBar extends Component{
	render(){
		return(
			<nav>
				<div id="MainMenu">
					<h1 id="MenuTitle">Promedical</h1>
					<ul id="MenuList">

						<li><Link to="/lainaus"><div>Lainaus</div> </Link></li>
						<li><Link to="/palautus"><div>Palautus</div></Link></li>
						<li><Link to="/varaus"><div>Varaus</div></Link></li>
						<li><Link to="/lisaatuote"><div>Lisää tuote</div></Link></li>
						<li><Link to="/varasto"><div>Varasto</div></Link></li>

					</ul>
				</div>
			</nav>
		);
	}

}

export default NavBar;

/* Joel Salminen - joel.salminen@student.lut.fi */
