import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Posts from "../apps/Posts/index";
import styles from "../styles/index.css";

function PagePosts() {
    return (
        <>
            <div className="page-container">
                <Header />
                <div class="page">
                    <h1>Posts</h1>
                    <Posts />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default PagePosts;
