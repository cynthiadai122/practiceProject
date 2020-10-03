import React, { Component } from 'react';
import './App.css';
import './pages/UserPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';
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
        <Route path="/api/v2/users" component={UserPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/userInfo/:id" component={UserInfoPage}/>
      
      </div>
    </Router>
    </>
  );
}
}

export default App;

