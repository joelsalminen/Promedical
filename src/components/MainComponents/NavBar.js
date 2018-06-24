import React, {Component} from "react";
import { Link } from 'react-router-dom';

import './NavBar.css';

/* Display Main menu */
class NavBar extends Component{
	render(){
		return(
			<nav className="NavBar__menu">
				<div>
					<h1 className="NavBar__menu__title">Promedical</h1>
					<ul>

						<li><Link to="/lainaus"><div><p>Lainaus</p></div> </Link></li>
						<li><Link to="/palautus"><div><p>Palautus</p></div></Link></li>
						<li><Link to="/varaus"><div><p>Varaus</p></div></Link></li>
						<li><Link to="/lisaatuote"><div><p>Lisää tuote</p></div></Link></li>
						<li><Link to="/varasto"><div><p>Varasto</p></div></Link></li>

					</ul>
				</div>
			</nav>
		);
	}

}

export default NavBar;

/* Joel Salminen - joel.salminen@student.lut.fi */
