import React, { Component } from 'react';
import Main from './components/Main';
import LendItem from './components/LendItem';
import AddItem from './components/AddItem';
import Storage from './components/Storage';
import BookItem from './components/BookItem';
import Inventory from './components/Inventory';
import History from './components/History';
import ReturnItem from './components/ReturnItem';


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
  	items = JSON.stringify(items, null, 2);
  	items = '{"item": ' + items + '}';
  	let items_obj = JSON.parse(items);


  	
    return(
    <Router>
      <div>

        <Route exact path="/" component={Main}/>
        <Route exact path="/varaus" render={()=> <BookItem items={items_obj}/>}/>
        <Route exact path="/lainaus" render={() => <LendItem items={items_obj}/>}/>
        <Route exact path="/palautus" render={()=> <ReturnItem items={items_obj}/>}/>
        <Route exact path="/lisaatuote" component={AddItem}/>
        <Route exact path="/varasto" render={()=> <Storage />}/>
        <Route exact path="/inventaario" component={Inventory}/>
        <Route exact path="/historia" component={History}/>

        
      </div>
    </Router>
    );
  }
}

export default App;
