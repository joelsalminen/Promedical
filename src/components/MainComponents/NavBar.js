import React from "react";
import { Link } from 'react-router-dom'

const NavBar = (props) =>
    <nav>
        <div>
            <ul>
                <li ><h1>Promedical</h1></li>
                <li ><Link to="/">Home</Link></li>
    
            </ul>
        </div>
    </nav>;

export default NavBar;