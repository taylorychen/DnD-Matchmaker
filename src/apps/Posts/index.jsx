import React, { useState } from "react";
import { Grid, Button, Dialog } from "@mui/material";
import { collection, query, where } from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import ModalCreate from "./modal-create";
import PostingCards from "./postings-card";
import { db } from "../../firebase/config";
import { createRandomPosts } from "../../firebase/populate";
import "../../styles/index.css";

function Posts() {
    const postsRef = collection(db, "Posts");
    const [postsSnapshot, postsLoading, postsError] = useCollectionOnce(
        query(postsRef, where("isActive", "==", true))
    );
    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => {
        console.log("hi");
        setOpenCreate(true);
    };
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    return (
        <>
            <ModalCreate />

            {/* <ModalCreate
                open={openCreate}
                handleOpen={handleOpenCreate}
                handleClose={handleCloseCreate}
            /> */}
            <Grid container spacing={2}>
                {postsSnapshot && (
                    <>
                        {postsSnapshot.docs.map((doc) => {
                            return (
                                <Grid item key={doc.data().date}>
                                    <PostingCards post={doc.data()} />
                                </Grid>
                            );
                        })}
                    </>
                )}
            </Grid>

            <button
                onClick={() => {
                    createRandomPosts(1);
                }}
            >
                add post
            </button>
        </>
    );
}

export default Posts;
