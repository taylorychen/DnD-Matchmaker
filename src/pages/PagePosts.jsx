import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Posts from "../apps/Posts/index";
import styles from "../styles/index.css";
import { fontSize } from "@mui/system";

function PagePosts() {
    return (
        <>
            <div className="page-container">
                <Header />
                <div className="page">
                    <h1 style={{ marginTop: 40, fontSize: 70 }}>Posts</h1>
                    <Posts />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default PagePosts;
