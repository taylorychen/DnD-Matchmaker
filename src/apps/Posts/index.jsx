import React, { useState, useEffect } from "react";
import {
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Chip,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
    useCollectionData,
    useCollectionDataOnce,
} from "react-firebase-hooks/firestore";
import ModalCreate from "./modal-create";
import PostingCard from "./posting-card";
import { db } from "../../firebase/config";
import { createRandomPosts } from "../../firebase/populate";
import { convertToPostId } from "../../firebase/helpers";
import { currentUserEmail } from "../../firebase/auth";

export const tags = {
    strictRules: "strict rules",
    looseRules: "loose rules",
    oneShot: "one-shot",
    campaign: "campaign",
    homebrew: "homebrew",
    preWritten: "pre-written",
};

const searchMatch = (item, search, property) => {
    if (search === "") search = "(?:)";
    const searchExp = new RegExp(search, "i");
    return !!item[property].match(searchExp);
};

function Posts() {
    const postsRef = collection(db, "Posts");
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("title");
    const [searchTags, setSearchTags] = useState([]);
    // const [postsValues, postsLoading, postsError, postsSnapshot] =
    //     useCollectionDataOnce(query(postsRef, where("isActive", "==", true)));
    const [allPosts, setAllPosts] = useState([]);

    const getAllPosts = async () => {
        const userEmail = currentUserEmail();

        const wheres = []; // list of queries

        // only get active queries and non-user queries
        wheres.push(where("isActive", "==", true));
        // console.log(userEmail);
        wheres.push(where("owner", "!=", userEmail));

        // add tags to queries
        if (searchTags !== [])
            searchTags.forEach((tag) => {
                wheres.push(where(tag, "==", true));
            });

        const firestoreQuery = query(postsRef, ...wheres);
        const querySnapshot = await getDocs(firestoreQuery);
        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        // console.log(posts);
        setAllPosts(posts);
    };

    useEffect(() => {
        getAllPosts();
    }, [searchTags]);

    return (
        <>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Grid item xs={5}>
                    <TextField
                        label="Search"
                        variant="standard"
                        fullWidth
                        InputProps={{
                            inputProps: { style: { textAlign: "left" } },
                        }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") setSearch(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel>Search By</InputLabel>
                        <Select
                            variant="standard"
                            value={searchBy}
                            label="Search By"
                            onChange={(e) => {
                                setSearchBy(e.target.value);
                            }}
                        >
                            <MenuItem value="title">Title</MenuItem>
                            <MenuItem value="location">Location</MenuItem>
                            {/* <MenuItem value="tags">Tags</MenuItem> */}
                            <MenuItem value="description">Description</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel>Tags</InputLabel>
                        <Select
                            variant="standard"
                            multiple
                            value={searchTags}
                            label="Tags"
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            onChange={(e) => {
                                setSearchTags(e.target.value);
                            }}
                        >
                            {Object.values(tags).map((tag) => {
                                return (
                                    <MenuItem key={tag} value={tag}>
                                        {tag}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} size="large">
                    <ModalCreate />
                </Grid>
            </Grid>

            <Grid container spacing={4} justifyContent="center">
                {allPosts && (
                    <>
                        {allPosts.map((doc) => {
                            if (searchMatch(doc, search, searchBy))
                                return (
                                    <Grid item key={doc.date}>
                                        <PostingCard post={doc} />
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
