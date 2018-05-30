import React, { Component } from 'react';
import NavBar from "./MainComponents/NavBar";
import '../App.css';
import LoginForm from "./MainComponents/LoginForm";
import RegistrationForm from "./MainComponents/RegistrationForm";
import $ from 'jquery';
import LogoutButton from "./MainComponents/LogoutButton";

class Main extends Component{
	constructor(props){
		super(props)

		this.registerUser = this.registerUser.bind(this);
		this.onLogoutClick = this.onLogoutClick.bind(this);
	}


	/* Register user to the app */
	registerUser(email, password){
		$.ajax({
			url: 'api/signup',
			method: 'post', 
			data: {email, password},
			success: (token)=>{
				localStorage.setItem('token', token.token);
				this.forceUpdate();
			},
			error: (err)=>{
				console.log(err);
			}
		})
	}

	/* Clear localstorage to get rid of the authetication token */
	onLogoutClick(){
		localStorage.clear();
		this.forceUpdate();
	}


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

			<LogoutButton onLogoutClick={this.onLogoutClick}/>
		</div>);
	}
}


export default Main;

/* Joel Salminen - joel.salminen@student.lut.fi */