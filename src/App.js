import React from 'react';
import Main from './components/Main';
import LendAndReturn from './components/LendAndReturn';
import AddItem from './components/AddItem';
import Storage from './components/Storage';
import Expired from './components/Expired';
import BookItem from './components/BookItem';
import Inventory from './components/Inventory';
import History from './components/History';
import Return from './components/Return'


import './App.css';

import {
  BrowserRouter as Router, 
  Route
} from 'react-router-dom'

const App = () =>
  <Router>
    <div>

      <Route exact path="/" component={Main}/>
      <Route exact path="/varaus" component={BookItem}/>
      <Route exact path="/lainaus" component={LendAndReturn}/>
      <Route exact path="/palautus" component={Return}/>
      <Route exact path="/lisaatuote" component={AddItem}/>
      <Route exact path="/varasto" component={Storage}/>
      <Route exact path="/eraantyneet" component={Expired}/>
      <Route exact path="/inventaario" component={Inventory}/>
      <Route exact path="/historia" component={History}/>




    </div>
  </Router>
  

export default App;
