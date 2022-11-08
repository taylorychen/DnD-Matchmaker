import React from "react";
import Header from "../components/header";
import { currentUserEmail, login, logout } from "../firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

function Login() {
  const [currUser] = useAuthState(auth);

  return (
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
      <button onClick="sayHello()">Login</button>
      <div> don't have an account? </div>
      <button
        onClick={() => {
          login();
        }}
      >
        create account
      </button>
      <button
        onClick={() => {
          logout();
        }}
      >
        log out
      </button>
      <div>{currUser ? currentUserEmail() : "not signed in"}</div>
    </div>
  );
}

export default Login;
