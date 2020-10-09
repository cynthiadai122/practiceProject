import React, { Component } from 'react';
import './App.css';
import './pages/UserPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';

import NavBar from './components/NavBar';

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
        <Route path="/api/v2/users" component={UserPage}/>
      
        <Route path="/users/:id" component={UserInfoPage}/>
        
    
      </div>
    </Router>
    </>
  );
}
}

export default App;





