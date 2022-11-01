import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Footer() {
  return (
    <nav>
      <ul>
      <div>Footer</div>
        <li>
          <Link to="/Postings">Postings</Link>
        </li>
        <li>
          <Link to="/Profile">Profile</Link>
        </li>
        <li>
          <Link to="/haha">Error</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Footer;
