import React from 'react';
import ValidatedLoginForm from "../components/ValidatedLoginForm";

// https://developer.okta.com/blog/2019/03/06/simple-user-authentication-in-react
const LoginPage = () =>{
 
return(
    <div className="App">
    <h1>Validated Login Form</h1>
    <ValidatedLoginForm />
    
  </div>
);

}
export default LoginPage;

