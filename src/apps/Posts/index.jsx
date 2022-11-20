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
    Switch,
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
import { currentUserEmail } from "../../firebase/auth";
import "../../styles/index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const light = {
    palette: {
        mode: "light",
    },
};

const dark = {
    palette: {
        mode: "dark",
    },
};

export const tags = {
    "loose rules": "t_looseRules",
    "one shot": "t_oneShot",
    campaign: "t_campaign",
    homebrew: "t_homebrew",
    "pre-written": "t_preWritten",
};

const searchMatch = (item, search, property) => {
    if (search === "") search = "(?:)";
    const searchExp = new RegExp(search, "i");
    return !!item[property].match(searchExp);
};

function Posts() {
    const postsRef = collection(db, "Posts");
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("location");
    const [searchTags, setSearchTags] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // This function is triggered when the Switch component is toggled
    const changeTheme = () => {
        if (isDarkMode) {
            setIsDarkMode(false);
        } else {
            setIsDarkMode(true);
        }
    };

    const getAllPosts = async () => {
        const wheres = []; // list of queries

        // only get active queries
        wheres.push(where("isActive", "==", true));

        // add tags to queries
        if (searchTags !== [])
            searchTags.forEach((tag) => {
                wheres.push(where(tags[tag], "==", true));
            });

        const firestoreQuery = query(postsRef, ...wheres);
        const querySnapshot = await getDocs(firestoreQuery);

        const posts = [];
        querySnapshot.forEach((doc) => {
            // filter out user's posts
            if (doc.data().owner !== currentUserEmail()) posts.push(doc.data());
        });

        // console.log(posts);
        setAllPosts(posts);
    };

    useEffect(() => {
        getAllPosts();
    }, [searchTags]);

    return (
        <>
            <ThemeProvider
                theme={isDarkMode ? createTheme(dark) : createTheme(light)}
            >
                <Switch checked={isDarkMode} onChange={changeTheme}>
                    Dark Mode
                </Switch>
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
                                // check if search bar is empty
                                else if (
                                    e.key == "Backspace" &&
                                    e.target.value.length === 1
                                )
                                    setSearch("");
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
                                <MenuItem value="location">Location</MenuItem>
                                <MenuItem value="title">Title</MenuItem>
                                {/* <MenuItem value="description">
                                    Description
                                </MenuItem> */}
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
                                {Object.entries(tags).map((tag) => {
                                    return (
                                        <MenuItem key={tag[0]} value={tag[0]}>
                                            {tag[0]}
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
                    Add
                </button>
            </ThemeProvider>
        </>
    );
}

export default Posts;
