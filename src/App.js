import React, { Component } from 'react';
import './App.css';
import './pages/UserPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';
import EditUserPage from './pages/EditUserPage';
import AddUserPage from './pages/AddUserPage';


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
        <Route path="/users/:id" component={UserInfoPage}/>
        <Route path="/editInfo/:id" component={EditUserPage}/>
        <Route path="/addUser" component={AddUserPage}/>
        
      
      </div>
    </Router>
    </>
  );
}
}

export default App;

