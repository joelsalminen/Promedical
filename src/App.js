import React from 'react';
import Main from './components/Main';
import Lend from './components/LendAndReturn';
import NavBar from "./components/MainComponents/NavBar";
import './App.css';
import {
  BrowserRouter as Router, 
  Route
} from 'react-router-dom'

const App = () =>
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={Main}/>
      <Route exact path="/lend" component={Lend}/>

    </div>
  </Router>
  

export default App;
