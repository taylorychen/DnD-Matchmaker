import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { collection, query, where } from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import ModalCreate from "../apps/Posts/modal-create";
import PostingCards from "../apps/Posts/postings-card";
import Footer from "../components/footer";
import Header from "../components/header";
import { db } from "../firebase/config";
import { createRandomPosts } from "../firebase/populate";
import Posts from "../apps/Posts/index";
import "../styles/index.css";

function PagePostings() {
    return (
        <>
            <Header />
            <div class="page">
                <Typography variant="h2" sx={{ my: 2 }}>
                    Posts
                </Typography>
                <Posts />
            </div>
            <Footer />
        </>
    );
}

export default PagePostings;
