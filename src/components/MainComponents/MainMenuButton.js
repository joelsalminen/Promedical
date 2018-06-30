import React from "react";
import { Link } from 'react-router-dom';

import './MainMenuButton.css';

const MainMenuButton = (props) =>
	<nav>
		<div className="MainMenuButton__container">
				<Link to="/"><div className="MainMenuButton">Takaisin</div></Link>
		</div>
	</nav>;

export default MainMenuButton;

/* Joel Salminen - joel.salminen@student.lut.fi */ 