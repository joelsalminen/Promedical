import React, { Component } from 'react';

import NavBar from "./MainComponents/NavBar";
import LoginForm from "./MainComponents/LoginForm";
import RegistrationForm from "./MainComponents/RegistrationForm";
import $ from 'jquery';
import LogoutButton from "./MainComponents/LogoutButton";
import '../App.css';
import './Main.css';

class Main extends Component{
	constructor(props){
		super(props)

		this.state = {
			errorMessage: ""
		}

		this.registerUser = this.registerUser.bind(this);
		this.loginUser = this.loginUser.bind(this);
		this.onLogoutClick = this.onLogoutClick.bind(this);
	}


	/* Register user to the app */
	registerUser(email, username, password){
		$.ajax({
			url: 'api/signup',
			method: 'post', 
			data: {email, username, password},
			success: (token)=>{
				localStorage.setItem('token', token.token);
				localStorage.setItem('username', username);
				this.forceUpdate();
			},
			error: (err)=>{
				console.log(err);
			}
		})
	}

	/* login functionality */
	loginUser(email, password){
		$.ajax({
			url: 'api/login',
			method: 'post',
			data: {email, password},
			success: (token)=>{
				localStorage.setItem('token', token.token);
				this.forceUpdate();
			},
			error: (err)=>{
				this.setState({errorMessage: 'Incorrect credentials'});
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
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }

    /* The rest of the page */
    return (
    	<div>
    		<LogoutButton onLogoutClick={this.onLogoutClick} />
    		<NavBar/>
    	</div>


    );

	}

	render(){
		return(
			<div className="Main__container">

				{this.renderApp()}
			</div>
		);
	}
}


export default Main;

/* Joel Salminen - joel.salminen@student.lut.fi */