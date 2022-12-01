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
    Pagination,
    Stack,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import ModalCreate from "./modal-create";
import PostingCard from "./posting-card";
import { db } from "../../firebase/config";
import { createRandomPosts } from "../../firebase/populate";
import { currentUserEmail } from "../../firebase/auth";
import "../../styles/index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const textTheme = {
    typography: {
        fontFamily: "serif",
        fontSize: 16,
    },
};

const light = {
    typography: {
        fontFamily: "serif",
        fontSize: 16,
    },
    palette: {
        mode: "light",
    },
};

const dark = {
    typography: {
        fontFamily: "serif",
        fontSize: 16,
    },
    palette: {
        mode: "dark",
    },
};

export const TAGS = {
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

    const pageSize = 24;
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

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
                wheres.push(where(TAGS[tag], "==", true));
            });

        const firestoreQuery = query(postsRef, ...wheres);
        const querySnapshot = await getDocs(firestoreQuery);

        const posts = [];
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            // filter out user's posts and that are not full
            if (
                post.owner !== currentUserEmail() &&
                post.currPlayers < post.maxPlayers
            )
                posts.push(post);
        });

        setMaxPages(Math.ceil(posts.length / pageSize));
        setAllPosts(posts);
    };

    useEffect(() => {
        getAllPosts();
    }, [searchTags]);

    return (
        <>
            <ThemeProvider theme={createTheme(textTheme)}>
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
                            onChange={(e) => {
                                setSearch(e.target.value);
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
                                {Object.entries(TAGS).map((tag) => {
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

                <ThemeProvider
                    theme={isDarkMode ? createTheme(dark) : createTheme(light)}
                >
                    <Grid container spacing={4} justifyContent="center">
                        {allPosts && (
                            <>
                                {allPosts
                                    .slice(
                                        (page - 1) * pageSize,
                                        page * pageSize
                                    )
                                    .map((doc) => {
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

                    {/* <button
                        onClick={() => {
                            createRandomPosts(1);
                        }}
                    >
                        Add
                    </button> */}
                </ThemeProvider>
                {maxPages !== 1 ? (
                    <Stack alignItems="center" sx={{ my: 2 }}>
                        <Pagination
                            hideNextButton
                            hidePrevButton
                            variant="outlined"
                            shape="rounded"
                            siblingCount={1}
                            count={maxPages}
                            page={page}
                            onChange={(e) => {
                                setPage(parseInt(e.target.outerText));
                            }}
                        />
                    </Stack>
                ) : null}
            </ThemeProvider>
        </>
    );
}

export default Posts;
