import Menu from "./MainComponents/MainMenuButton";
import React, { Component } from 'react';



class Return extends Component{
	constructor(props){
		super(props);

		this.state = {
			serial: "",
			items: {}, 
		}

		this.serialChangeHandler = this.serialChangeHandler.bind(this);	
		this.returnItem = this.returnItem.bind(this);
	}


	serialChangeHandler (evt){
		this.setState({serial: evt.target.value });
	}

	returnItem(){
		console.log("Serial number sent to backend");
	}

	componentDidMount(){
		setTimeout(()=>{
			this.setState({items: this.props.items});
			//console.log(this.state.items);
		}, 500);
		
	}

	render(){

		return(
		<div>
			<Menu />
			<h1>Palautus</h1>

			<p>Sarjanumero:</p>
			<input name="serial_number" type="text" placeholder="serial number" onChange={this.serialChangeHandler}/>

			<br/>
			<br/>
			<button className="SubmitButton" onClick={this.returnItem}>Palauta</button>

			
		</div>);
	}

}
export default Return;
