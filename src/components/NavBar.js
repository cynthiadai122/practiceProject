import React from 'react';
import axios from 'axios';
const { Link } = require("react-router-dom");


const NavBar = ()=>{
    const deleteUserToken=() =>{
      axios.delete('/api/v2/users/tokens') .then(response => {
        window.location.href = '/login';
    }
    )
}
return(
<nav className="nav">
    <ul>
        <li>
            <Link to="/api/v2/users">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
        <li>
            <Link to="/contact-us">Contact us</Link>
        </li>
        
            <button id="log-out-btn" className="btn btn-outline-info"  onClick={()=>deleteUserToken()} >Log out</button>
        
    </ul>
</nav>

);
}
export default NavBar;