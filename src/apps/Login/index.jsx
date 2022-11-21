import React from "react";
import "./login.css";

import titlePNG from "../../images/ddtitle.png";
import dice from "../../images/DNDdiceRoll.gif";
import dragon from "../../images/dragon.gif";

import { currentUserEmail, login, logout } from "../../firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import Header from "../../components/header";

import { useNavigate } from "react-router-dom";

function Login() {
    const [currUser] = useAuthState(auth);

    const navigate = useNavigate();

    return (
        <>
            {/* //<Header /> */}
            <div className="login_page">
                {/* the box container */}
                <div class="box_container">
                    {/* the image/title */}
                    <img className="title_image" src={titlePNG} alt="title" />

                    <h1 className="title_txt">Matchmaker</h1>
                    <break></break>
                    <h1 className="description">Form Your Dream Team</h1>

                    {/* username*/}
                    {/* <div className="input-container" style={{ order: "3" }}>
                        <label>Username </label>

                        <input type="text" name="uname" required />
                    </div> */}

                    {/* password */}
                    {/* <div className="input-container" style={{ order: "4" }}>
                        <label>Password </label>

                        <input type="password" name="pass" required />
                    </div> */}

                    {/* login button */}
                    <button
                        className="button_login"
                        onClick={() => {
                            if (login()) {
                                navigate("/Profile");
                            }
                        }}
                    >
                        Login
                    </button>

                    <img className="dragon" src={dragon} alt="loading..." />

                    <img
                        className="dragon"
                        src={dragon}
                        alt="loading..."
                        style={{
                            transform: "scaleX(-1)",
                            right: "460px",
                        }}
                    />

                    {/* <div style={{ order: "6" }}> don't have an account? </div> */}

                    {/* create account */}
                    {/* <button onClick="sayHello()" style={{ order: "7" }}>
                        create account
                    </button> */}

                    {/* <button
                        onClick={() => {
                            logout();
                        }}
                    >
                        log out
                    </button> */}

                    {/* <div>{currUser ? currentUserEmail() : "not signed in"}</div> */}
                </div>

                <img className="dice" src={dice} alt="loading..." />
            </div>
        </>
    );
}

export default Login;
