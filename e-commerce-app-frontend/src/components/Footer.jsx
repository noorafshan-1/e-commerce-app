import React from "react";
import "../styles/styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          © {new Date().getFullYear()} TrendMart. All rights reserved. Designed
          and developed by {/* <strong>Noorafshan.</strong> */}
          <a
            // href="https://abc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-name"
          >
            Noorafshan.
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
