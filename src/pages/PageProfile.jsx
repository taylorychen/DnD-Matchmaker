import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Profile from "../apps/Profile/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

export default function PageProfile() {
    const [user] = useAuthState(auth);

    return (
        <div>
            <Header />
            <h1>My Profile</h1>
            {user ? (
                <Profile />
            ) : (
                <h2>Not seeing anything? You might not be logged in.</h2>
            )}
            <Footer />
        </div>
    );
}
