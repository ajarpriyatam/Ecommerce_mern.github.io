import React from "react";
import "./header.css";
const Header = () => {
  return (
    <header>
        <div className="logo">
            ECOMMERCE
        </div>
        <div className="menu" id="nav">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/service">service</a></li>
                <li><a href="/signup_signin">Login</a></li>
            </ul>
        </div>
    </header>
  );
};

export default Header;