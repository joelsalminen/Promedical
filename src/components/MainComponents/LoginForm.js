import React, {Component} from 'react';

class LoginForm extends Component{
	constructor(props){
		super(props)

		this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}


	onLoginFormSubmit(evt){
		evt.preventDefault();
		this.props.loginUser(this.state.email, this.state.password);
	}


  changeHandler(evt){
    this.setState({[evt.target.name]: evt.target.value});
  }

	render(){
		return(
			<div>
				<form onSubmit={this.onLoginFormSubmit}>
          <input onChange={this.changeHandler} name="email" type="text" placeholder="username"/>
          <input onChange={this.changeHandler} name="password" type="password" placeholder="Password"/>
          <input type="submit" value="Login"/>
		    </form>

			</div>
		);
	}
}

export default LoginForm;

/* Joel Salminen - joel.salminen@student.lut.fi */