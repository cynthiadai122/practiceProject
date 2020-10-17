import React, { Component } from 'react';
import './App.css';
import './pages/UserPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import { Provider } from "react-redux";
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
        </Provider>
      </div>
    </Router>
    </>
  );
}
}

export default App;





