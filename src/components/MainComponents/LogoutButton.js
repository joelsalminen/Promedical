import React, {Component} from 'react';
import './LogoutButton.css'

class LogoutButton extends Component{

	render(){
		return (
			<div className="LogoutButton">
				<button 
					className="LogoutButton__button"
					onClick={this.props.onLogoutClick}
				>
					Logout
				</button>
			</div>
		)
	}
}

export default LogoutButton;

/* Joel Salminen - joel.salminen@student.lut.fi */