import React from "react";

import "./Footer.css";

 

function Footer() {

  return (

    <footer className="app-footer">

      <span>© {new Date().getFullYear()} Office Ride Sharing — Learning Project</span>

      <span className="app-footer-tagline">Built with React</span>

    </footer>

  );

}

 

export default Footer;

 

 