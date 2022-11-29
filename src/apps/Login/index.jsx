import React from "react";
import "./login.css";
import titlePNG from "../../images/ddtitle.png";
import background from "../../images/ddbackgroundtan.jpg";
import dice from "../../images/DNDdiceRoll.gif";
import dragon from "../../images/dragon.gif";

import { currentUserEmail, login, logout } from "../../firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

import { useNavigate } from "react-router-dom";
//hello

function Login() {
    const [currUser] = useAuthState(auth);
    const navigate = useNavigate();

    return (
        <>
            {/* //<Header /> */}
            <body
                className="login-page"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* the box container */}
                <div className="box-container">
                    {/* the image/title */}
                    <img className="title-img" src={titlePNG} alt="title" />

                    <h1>Matchmaker</h1>
                    <br></br>
                    <h2>Form Your Dream Team</h2>

                    {/* login button */}
                    <button
                        className="login-button"
                        onClick={() => {
                            if (currentUserEmail() != null) {
                                navigate("/Profile");
                            } else {
                                login().then((result) => {
                                    if (result) {
                                        navigate("/Profile");
                                    }
                                });
                            }
                        }}
                    >
                        Login
                    </button>

                    <div className="dragons-flex">
                        <div className="dragon-container">
                            <img
                                className="right-dragon"
                                src={dragon}
                                alt="loading..."
                            />
                        </div>
                        <div className="dragon-container">
                            <img
                                className="left-dragon"
                                src={dragon}
                                alt="loading..."
                            />
                        </div>
                    </div>
                </div>

                <img className="dice-image" src={dice} alt="loading..." />
            </body>
        </>
    );
}

export default Login;
