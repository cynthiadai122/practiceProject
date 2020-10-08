import React from 'react';
const { Link } = require("react-router-dom");

const NavBar = ()=>(
<nav className="nav">
    <ul>
        <li>
            <Link to="/api/v2/users">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
        <li>
            <Link to="/article-list">Contact us</Link>
        </li>
    
    
    </ul>
</nav>

);

export default NavBar;