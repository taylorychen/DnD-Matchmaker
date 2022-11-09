import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Profile from "../apps/Profile/index";

export default function PageProfile() {
    return (
        <div>
            <Header />
            <h1>My Profile</h1>
            <Profile />
            <Footer />
        </div>
    );
}
