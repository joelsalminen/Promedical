import React, {Component} from 'react';

class LogoutButton extends Component{

	render(){
		return (
			<button onClick={this.props.onLogoutClick}>Logout</button>
		)
	}
}

export default LogoutButton;

/* Joel Salminen - joel.salminen@student.lut.fi */