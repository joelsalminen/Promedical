import React from 'react';
import Main from './components/Main';
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

    </div>
  </Router>
  

export default App;
