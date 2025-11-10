import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* <div className="footer-links">
          <Link to="#">Contact</Link>
          <Link to="#">About</Link>
        </div> */}
        <p className="footer-text">
        © {new Date().getFullYear()} TrendMart. All rights reserved. Designed and developed by <strong>Noorafshan.</strong>

        </p>
      </div>
    </footer>
  );
};

export default Footer;
