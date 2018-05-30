import React, { Component } from 'react';
import NavBar from "./MainComponents/NavBar";
import '../App.css';
import LoginForm from "./MainComponents/LoginForm";
import RegistrationForm from "./MainComponents/RegistrationForm";

class Main extends Component{

	/* Login/registration or the main content */
	renderApp(){
		/* Login and registration */
    if (!localStorage.getItem('token')){
      return(
        <div>
          <RegistrationForm registerUser={this.registerUser} />
          <LoginForm loginUser={this.loginUser} />
        </div>
      );
    }
    /* The rest of the page */
    return (
    	<NavBar/>
    );

	}

	render(){
		return(
		<div>
			{this.renderApp()}
			
		</div>);
	}
}


export default Main;

/* Joel Salminen - joel.salminen@student.lut.fi */