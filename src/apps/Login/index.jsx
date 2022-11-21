import React from "react";
import "./login.css";
import titlePNG from "../../images/ddtitle.png";
import background from "../../images/ddbackgroundtan.jpg";
import dice from "../../images/DNDdiceRoll.gif";
import dragon from "../../images/dragon.gif";

import { currentUserEmail, login, logout } from "../../firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import Header from "../../components/header";

import { useNavigate } from "react-router-dom";

function Login() {
    const [currUser] = useAuthState(auth);
    // can whoever is working on this remove the username/password boxes and just have the login/logout and maybe the current user?

    const navigate = useNavigate();

    return (
        <>
            {/* //<Header /> */}
            <div
                className="login_page"
                style={{
                    display: "flex",
                    height: "100vh",
                    width: "100vw",
                    backgroundSize: "cover",
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* <h1>Welcome to UNHINGED: A Dungeons and Dragon's Matchmaker</h1> */}

                {/* the box container */}
                <div
                    className="box_container"
                    style={{
                        display: "flex",
                        height: "60vh",
                        width: "40vw",
                        backgroundColor: "#FFFFFF",
                        color: "black",
                        borderStyle: "solid",
                        borderColor: "#9e0b0f",
                        borderRadius: "15px",
                        borderWidth: "10px",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    {/* the image/title */}
                    <img
                        src={titlePNG}
                        alt="title"
                        style={{
                            position: "center",
                            alignSelf: "center",
                            //borderStyle: "solid",

                            height: "22vh",
                            width: "27vw",
                            // margin: "-14px",
                            // margin: '1rem 0'
                        }}
                    />

                    <h1>Matchmaker</h1>
                    <br></br>
                    <h2>Form Your Dream Team</h2>

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
                            //navigateHome();

                            //navigate("/Profile");
                        }}
                        style={{
                            height: "10vh",
                            width: "15vw",
                        }}
                    >
                        Login
                    </button>

                    <img
                        src={dragon}
                        alt="loading..."
                        style={{
                            position: "absolute",
                            height: "15%",
                            width: "10%",
                            bottom: "200px",
                            //right: "300px",
                        }}
                    />

                    <img
                        src={dragon}
                        alt="loading..."
                        style={{
                            position: "absolute",
                            transform: "scaleX(-1)",
                            height: "15%",
                            width: "10%",
                            bottom: "200px",
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

                <img
                    src={dice}
                    alt="loading..."
                    style={{
                        position: "absolute",
                        height: "25%",
                        bottom: "0px",
                        right: "0px",
                    }}
                />

                {/* <div className='flex justify-center items-center h-full'>
                        <h2 className='text-4xl font-bold text-center py-4'>BRAND</h2>
                        <div className='flex justify-between py-8'>

                        </div>
                        <div className='flex flex-col nb-4'>
                            <label>Username</label>
                            <input className='border relative big-gray-100 p-2' type="text" />

                        </div>
                    </div> */}
            </div>
        </>
    );
}

export default Login;
