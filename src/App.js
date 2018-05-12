import React, { Component } from 'react';
import Main from './components/Main';
import LendItem from './components/LendItem';
import AddItem from './components/AddItem';
import Storage from './components/Storage';
import BookItem from './components/BookItem';
import History from './components/History';
import ReturnItem from './components/ReturnItem';


import './App.css';

import {
  BrowserRouter as Router, 
  Route
} from 'react-router-dom'

class App extends Component {

  render(){
	
    return(

    /* Routing: */ 
    <Router>
      <div>

        <Route exact path="/" component={Main}/>
        <Route exact path="/varaus" render={()=> <BookItem />}/>
        <Route exact path="/lainaus" render={() => <LendItem />}/>
        <Route exact path="/palautus" render={()=> <ReturnItem />}/>
        <Route exact path="/lisaatuote" component={AddItem}/>
        <Route exact path="/varasto" render={()=> <Storage />}/>
        <Route exact path="/historia" component={History}/>

        
      </div>
    </Router>
    );
  }
}

export default App;


/* Joel Salminen - joel.salminen@student.lut.fi */