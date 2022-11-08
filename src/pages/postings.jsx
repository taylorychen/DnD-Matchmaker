import React from "react";
import { Grid, Typography } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";
import PostingCards from "../components/postings-card";
import { db } from "../firebase/config";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { createRandomPosts } from "../firebase/populate";
import "../styles/index.css";

function Postings() {
  const postsRef = collection(db, "Posts");
  const [postsSnapshot, postsLoading, postsError] = useCollectionOnce(
    query(postsRef, where("isActive", "==", true))
  );

  return (
    <div>
      <Header />
      <div class="page">
        <Typography variant="h2" sx={{ my: 2 }}>
          Postings
        </Typography>
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
      </div>

      <Footer />
    </div>
  );
}

export default Postings;
