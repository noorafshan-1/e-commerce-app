import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} TrendMart. All rights reserved</p>
      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/cart">Cart</a>
        <a href="#">Contact</a>
        <a href="#">About</a>
      </div>
    </footer>
  );
};

export default Footer;
