import React, {Component} from 'react';

class RegistrationForm extends Component{
	constructor(props){
		super(props)

		this.onRegisterFormSubmit = this.onRegisterFormSubmit.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}

	/*  */
	onRegisterFormSubmit(evt){
		evt.preventDefault();
		this.props.registerUser(this.state.email, this.state.password);
	}

	/* */
  changeHandler(evt){
    this.setState({[evt.target.name]: evt.target.value});
  }

	render(){
		return(
			<div>
				<form onSubmit={this.onRegisterFormSubmit}>
          <input onChange={this.changeHandler} name="email" type="text" placeholder="username"/>
          <input onChange={this.changeHandler} name="password" type="password" placeholder="Password"/>
          <input type="submit" value="Register"/>
        </form>

			</div>
		);
	}
}

export default RegistrationForm;

/* Joel Salminen - joel.salminen@student.lut.fi */