import React from "react";
import "./header.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { currentUserEmail, login, logout } from "../firebase/auth";
//TODO: if the user is not sign in then have the profile dropdown menu be a signin button instead

import { useNavigate } from "react-router-dom";

export default function Header() {
    const [login] = useAuthState(auth);

    const navigate = useNavigate();

    return (
        <nav className="nav">
            <a className="welcome">Unhinged: D&D Matchmaker</a>
            <ul>
                <li>
                    <a className="posting" href="/Postings">
                        Postings
                    </a>
                </li>
                <li>
                    <a className="profile" href="/Profile">
                        Profile
                    </a>
                </li>
                <li>
                    <button
                        className="sign_out_button"
                        onClick={() => {
                            navigate("/");
                            logout();

                            //navigateHome();

                            //navigate("/Profile");
                        }}
                    >
                        Sign Out
                    </button>
                    {/* {login ? (
                        navigate("/")
                    ) : (
                        <h2>
                            Not seeing anything? You might not be logged in.
                        </h2>
                    )} */}
                    {/* <div className="dropdown-items">
                        <a href="/Profile">Home</a>
                        <a href="/Profile">Sign Out</a>
                    </div> */}
                </li>
            </ul>

            {/* {user ? (
                    <Profile />
            ) : (
                    <h2>Not seeing anything? You might not be logged in.</h2>
            )} */}
        </nav>
    );
}
