import React from "react";
import Header from "../components/header";

function Login(){
    return(
            <div>
                <Header></Header>
                <h1>Welcome to UNHINGED: A Dungeons and Dragon's Matchmaker</h1>
                
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <button onClick="sayHello()">
                    Login
                </button>
                <div> don't have an account? </div>
                <button onClick="sayHello()">
                    create account
                </button>
            </div>
        
    );
}

export default Login;