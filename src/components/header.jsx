import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <ul>
  <div>nav bar  
  <Link to="/Postings">Postings</Link>  
   <Link to="/Profile">Profile</Link>  
   <Link to="/haha">Error</Link>  
   <Link to="/">Login Page</Link>  
 </div>
      </ul>
    </nav>
  );
}

export default Header;
