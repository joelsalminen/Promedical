import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';



class A extends Component{
	 constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      returnDate: moment(),
      start: "",
      return: ""
    };
    this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.returnDateChangeHandler = this.returnDateChangeHandler.bind(this);
  }

  componentDidMount(){
  	this.setState({
      start: moment().format().substring(0,10)
    });


  }

  startDateChangeHandler(date){
    this.setState({
      startDate: date
    });

    this.setState({
      start: date.format().substring(0,10)
    });
    
    
  }

  returnDateChangeHandler(date){
    this.setState({
    	returnDate: date
    });

    this.setState({
      return: date.format().substring(0,10)
    });
    
  }

	render() {
    return (
	    <div>
	    	
	    	<DatePicker
	        selected={this.state.startDate}
	        onChange={this.startDateChangeHandler} />

	        <DatePicker
	        selected={this.state.returnDate}
	        onChange={this.returnDateChangeHandler} />
				

			<p>{this.state.start}</p>
			<p>{this.state.return}</p>
				
	    </div>
	  );
  }
}


export default A;