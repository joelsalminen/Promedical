import React, {Component} from "react";
import { Link } from 'react-router-dom';

import './NavBar.css';

/* Display Main menu */
class NavBar extends Component{
	render(){
		return(
			<nav className="NavBar">
				<div>
					<h1 className="NavBar__title">Promedical</h1>
					<ul className="NavBar__list">

						<Link to="/lainaus"><li><div><p>Lainaus</p></div> </li></Link>
						<Link to="/palautus"><li><div><p>Palautus</p></div></li></Link>
						<Link to="/varaus"><li><div><p>Varaus</p></div></li></Link>
						<Link to="/lisaatuote"><li><div><p>Lisää tuote</p></div></li></Link>
						{ /*  
							<Link to="/poistatuote"><li><div><p>Poista tuote</p></div></li></Link>
						*/}
						<Link to="/varasto"><li><div><p>Seuranta</p></div></li></Link>
						<Link to="/dokumentit"><li><div><p>Sopimukset</p></div></li></Link>

					</ul>
				</div>
			</nav>
		);
	}

}

export default NavBar;

/* Joel Salminen - joel.salminen@student.lut.fi */
