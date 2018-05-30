import React, { Component } from 'react';
import NavBar from "./MainComponents/NavBar";
import '../App.css';
import LoginForm from "./MainComponents/LoginForm";
import RegistrationForm from "./MainComponents/RegistrationForm";

class Main extends Component{
	render(){
		return(
		<div>
			<LoginForm />
			<RegistrationForm/>
			<NavBar/>
		</div>);
	}
}


export default Main;

/* Joel Salminen - joel.salminen@student.lut.fi */