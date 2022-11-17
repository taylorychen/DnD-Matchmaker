import React from "react";
import "./header.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { currentUserEmail, login, logout } from "../firebase/auth";
//TODO: if the user is not sign in then have the profile dropdown menu be a signin button instead

export default function Header() {
    const [login] = useAuthState(auth);

    return (
        <nav className="nav">
            <a href="/" className="welcome">
                Unhinged: D&D Matchmaker
            </a>
            <ul>
                <li>
                    <a className="posting" href="/Postings">
                        Postings
                    </a>
                </li>
                <li>
                    <div className="dropdown">
                        <button className="dropdown-button">Profile</button>
                        <div className="dropdown-items">
                            <a href="/Profile">Home</a>
                            <a href="/Profile">Sign Out</a>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
}
