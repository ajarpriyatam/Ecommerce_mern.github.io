import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h1>THANKS</h1>
        <h2>For Visit</h2>
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/">Instagram</a>
        <a href="https://in.linkedin.com/">LinkedIn</a>
        <a href="https://facebook.com/">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;