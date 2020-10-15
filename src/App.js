import React, { Component } from 'react';
import './App.css';
import './pages/UserPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';
import NavBar from './components/NavBar';
import { Provider } from "react-redux";
import Home from './pages/Home'

import store from "./store"

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class App extends Component {
  render(){
  return (
    <>
    <Router>
      <div className="App">
      <NavBar/>
     
      <Route path="/" component={LoginPage} exact/>
       
        <Provider store={store}>
        <Route path="/api/v2/users" component={UserPage}/>
        <Route path="/users/:id" component={UserInfoPage}/>
        <Route path="/home" component={Home}/>
        </Provider>
      </div>
    </Router>
    </>
  );
}
}

export default App;





