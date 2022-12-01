import React from "react";
import Header from "../components/header";
import "../components/login.css";
import titlePNG from "../images/d&dPNG.png";
import background from "../images/ddbackgroundtan.jpg";

const divStyle = {
    width: "88%",
    height: "800px",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
};

function Login() {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                backgroundSize: "cover",
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
            }}
        >
            <Header></Header>
            <h1>Welcome to UNHINGED: A Dungeons and Dragon's Matchmaker</h1>

            <img
                src={titlePNG}
                alt="title"
                style={{
                    position: "absolute",
                    height: "250px",
                }}
            />

            <div className="input-container">
                <label>Username </label>
                <input type="text" name="uname" required />
            </div>
            <div className="input-container">
                <label>Password </label>
                <input type="password" name="pass" required />
            </div>
            <button onClick="sayHello()">Login</button>
            <div> don't have an account? </div>
            <button onClick="sayHello()">create account</button>
        </div>
    );
}

export default Login;
