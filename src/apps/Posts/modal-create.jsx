import React, { useState } from "react";
import "../Login/login.css";
import {
    Button,
    Dialog,
    TextField,
    FormControl,
    Checkbox,
    Grid,
    FormControlLabel,
} from "@mui/material";
import "./modal.css";
import { createPost } from "../../firebase/helpers";
import { currentUserEmail } from "../../firebase/auth";

// this modal component is for when users are trying to create a new post (database writing)
const ModalCreate = () => {
    const [gname, setGname] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [number, setNumber] = useState(0);
    const [tags, setTags] = useState([]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setGname(""); //clear the state
        setLocation("");
        setDescription("");
        setNumber(0);
        setTags([]);
    };

    const handleSubmit = () => {
        if (
            gname === "" ||
            location === "" ||
            description === "" ||
            number === 0
        ) {
            alert("you have to give inputs or have more than 0 players");
        } else {
            setOpen(false);
            console.log("finalTags:", tags);
            createPost(
                currentUserEmail(),
                gname,
                description,
                tags,
                location,
                number
            );
            alert("You have successfully created a post!");
            setGname("");
            setLocation("");
            setDescription("");
            setNumber(0);
            setTags([]);
        }
    };

    const handleTag = (theTag) => {
        //find if the tag exists
        const testing = tags.filter((word) => word === theTag);
        console.log("testing", testing);
        if (testing[0] === theTag) {
            //if you found it
            removeTag(theTag);
        } else {
            //if you did not find it
            setTags(tags.concat(theTag));
        }
    };

    const removeTag = (theTag) => {
        const newArray = tags.filter((word) => word !== theTag);
        setTags(newArray);
    };

    return (
        <>
            <h1 className="title_posts">Posts</h1>
            <Button
                style={{ marginBottom: "30px" }}
                onClick={handleOpen}
                variant="contained"
                sx={{ minWidth: 0.1, backgroundColor: "darkred", mb: 2 }}
            >
                Create
            </Button>

            <Dialog open={open} sx={{ Width: 700 }}>
                <div className="modal-content">
                    <FormControl>
                        <h2>Create A New Game Post</h2>
                        <br></br>
                        <br></br>
                        <Grid container spacing={2}>
                            <TextField
                                required
                                id="gname"
                                label="Name the Game"
                                variant="outlined"
                                onChange={(e) => {
                                    setGname(e.target.value);
                                    console.log(gname);
                                }}
                            />
                            <TextField
                                required
                                id="location"
                                label="location"
                                variant="outlined"
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                    console.log(location);
                                }}
                            />
                            <TextField
                                required
                                id="description"
                                label="description"
                                variant="outlined"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    console.log(description);
                                }}
                            />
                            <TextField
                                required
                                id="number"
                                label="number"
                                variant="outlined"
                                onChange={(e) => {
                                    setNumber(e.target.value);
                                    console.log(number);
                                }}
                            />
                        </Grid>

                        <Grid continer spacing={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="StrictRules"
                                        onChange={(e) => {
                                            handleTag("Strict Rules");
                                        }}
                                    />
                                }
                                label="Strict Rules"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="LooseRules"
                                        onChange={(e) => {
                                            handleTag("Loose Rules");
                                        }}
                                    />
                                }
                                label="Loose Rules"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="LowLevel"
                                        onChange={(e) => {
                                            handleTag("Low Level (1-4)");
                                        }}
                                    />
                                }
                                label="Low Level (1-4)"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="MidLevel"
                                        onChange={(e) => {
                                            handleTag("Mid Level (5-10)");
                                        }}
                                    />
                                }
                                label="Mid Level (5-10)"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="HighLevel"
                                        onChange={(e) => {
                                            handleTag("High Level(10-14)");
                                        }}
                                    />
                                }
                                label="High Level(10-14)"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="VeryHighLevel"
                                        onChange={(e) => {
                                            handleTag("Very High Level(14-20)");
                                        }}
                                    />
                                }
                                label="Very High Level(14-20)"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="Virtual"
                                        onChange={(e) => {
                                            handleTag("Virtual");
                                        }}
                                    />
                                }
                                label="Virtual"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="Homebrew"
                                        onChange={(e) => {
                                            handleTag("Homebrew");
                                        }}
                                    />
                                }
                                label="Homebrew"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="Pre-written"
                                        onChange={(e) => {
                                            handleTag("Pre-written");
                                        }}
                                    />
                                }
                                label="Pre-written"
                            />
                        </Grid>
                        <Button
                            type="submit"
                            variant="outlined"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </FormControl>
                    <br></br>
                    <br></br>
                    <Button onClick={handleClose}>close</Button>
                </div>
            </Dialog>
        </>
    );
};

export default ModalCreate;
