import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { collection, query, where } from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import ModalCreate from "../apps/Posts/modal-create";
import PostingCards from "../apps/Posts/posting-card";
import Footer from "../components/footer";
import Header from "../components/header";
import { db } from "../firebase/config";
import { createRandomPosts } from "../firebase/populate";
import Posts from "../apps/Posts/index";
import styles from "../styles/index.css";

function PagePosts() {
    return (
        <>
            <Header />
            <div class="page">
                <Typography variant="h2" sx={{ my: 2 }} align="left">
                    Posts
                </Typography>
                <Posts />
            </div>
            <Footer />
        </>
    );
}

export default PagePosts;
