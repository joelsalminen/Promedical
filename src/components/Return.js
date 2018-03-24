import Menu from "./MainComponents/MainMenuButton";
import React, { Component } from 'react';



class Return extends Component{
	constructor(props){
		super(props);

		this.state = {
			serial: "",
		}

		this.serialChangeHandler = this.serialChangeHandler.bind(this);	
	}


	serialChangeHandler (evt){
		this.setState({serial: evt.target.value });
	}

	render(){


		return(
		<div>
			<Menu />
			<input name="serial_number" type="text" placeholder="serial number" onChange={this.serialChangeHandler}/>
			<button>Palauta</button>

			<p>{this.state.serial}</p>
		</div>);
	}

}
export default Return;
