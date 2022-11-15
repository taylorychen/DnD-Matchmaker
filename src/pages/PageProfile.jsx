import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Profile from "../apps/Profile/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import "../styles/index.css";

export default function PageProfile() {
  const [user] = useAuthState(auth);

  return (
    <div className="page-container">
      <Header />
      {user ? (
        <Profile />
      ) : (
        <h2>Not seeing anything? You might not be logged in.</h2>
      )}
      <Footer />
    </div>
  );
}
