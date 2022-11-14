import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <h3>Unhinged: Dungeons & Dragons Matchmaker</h3>
        <p>
          Unhinged: D&D Matchmaker is a web application that creates a fun and
          easy way for D&D players to find other players to play with!
        </p>
        <p>
          Developed By: Taylor Chen | Connor Choi | Gayatri Puppala | Annie Tran
          | Angeline Xu
        </p>
        <div className="footer-links">
          <ul>
            <li>
              <a href="/Profile">Home</a>
            </li>
            <li>
              <a href="/Postings">Postings</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
