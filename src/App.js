import React, { Component } from 'react';
import Main from './components/Main';
import LendItem from './components/LendItem';
import AddItem from './components/AddItem';
import Storage from './components/Storage';
import BookItem from './components/BookItem';
import Inventory from './components/Inventory';
import History from './components/History';
import ReturnItem from './components/ReturnItem'


import './App.css';

import {
  BrowserRouter as Router, 
  Route
} from 'react-router-dom'

class App extends Component {
  state = {
    items: {}
  };

  componentDidMount() {
    this.callApi()
      .then(res => {
      	this.setState({ items: res });
      })
      .catch(err => console.log(err));


  }

  callApi = async () => {
    const response = await fetch('/api/items');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };


  render(){
  	let items = this.state.items;
  	
    return(
    <Router>
      <div>

        <Route exact path="/" component={Main}/>
        <Route exact path="/varaus" component={BookItem}/>
        <Route exact path="/lainaus" component={LendItem}/>
        <Route exact path="/palautus" component={ReturnItem}/>
        <Route exact path="/lisaatuote" component={AddItem}/>
        <Route exact path="/varasto" component={Storage}/>
        <Route exact path="/inventaario" component={Inventory}/>
        <Route exact path="/historia" component={History}/>

        <p>{JSON.stringify(items, null, 2)}</p>
      </div>
    </Router>
    );
  }
}

export default App;
