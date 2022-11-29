import React, { useState } from "react";
import {
    Button,
    Dialog,
    TextField,
    FormControl,
    Checkbox,
    Grid,
    FormControlLabel,
    DialogContent,
} from "@mui/material";
import "./modal.css";
import { createPost } from "../../firebase/helpers";
import { currentUserEmail } from "../../firebase/auth";
import { TAGS } from "./index";

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
                looseRules,
                oneShot,
                campaign,
                homebrew,
                prewritten,
                location,
                number
            );
            // alert("You have successfully created a post!");
            setGname("");
            setLocation("");
            setDescription("");
            setNumber(0);
            setTags([]);
        }
    };

    const [looseRules, setLRules] = useState(false);
    const [oneShot, setOneShot] = useState(false);
    const [campaign, setCampaign] = useState(false);
    const [homebrew, setHomebrew] = useState(false);
    const [prewritten, setPrewritten] = useState(false);

    const handleTag = (theTag) => {
        if (theTag === "t_looseRules") {
            setLRules(!looseRules);
            console.log("looseRules:", !looseRules);
        } else if (theTag === "t_oneShot") {
            setOneShot(!oneShot);
            console.log("oneshot:", !oneShot);
        } else if (theTag === "t_campaign") {
            setCampaign(!campaign);
            console.log("campaign:", !campaign);
        } else if (theTag === "t_homebrew") {
            setHomebrew(!homebrew);
            console.log("hombrew:", !homebrew);
        } else {
            setPrewritten(!prewritten);
            console.log("prewritten:", !prewritten);
        }
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="contained"
                color="error"
                sx={{ minWidth: 0.1, backgroundColor: "darkred" }}
            >
                Create
            </Button>

            <Dialog open={open} sx={{ Width: 700 }}>
                <DialogContent>
                    <Grid container sx={{ mb: 5 }}>
                        <Grid item xs={10}></Grid>
                        <Grid item xs={2}>
                            <Button
                                onClick={handleClose}
                                color="error"
                                variant="contained"
                                sx={{ backgroundColor: "darkred" }}
                            >
                                close
                            </Button>
                        </Grid>
                    </Grid>

                    <FormControl>
                        <h1>Create A New Post</h1>
                        <br></br>
                        <br></br>
                        <TextField
                            required
                            id="gname"
                            fullWidth
                            label="title"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            onChange={(e) => {
                                setGname(e.target.value);
                                console.log(gname);
                            }}
                        />

                        <TextField
                            required
                            fullWidth
                            id="description"
                            label="description"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                console.log(description);
                            }}
                        />
                        <TextField
                            required
                            id="location"
                            label="location"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            onChange={(e) => {
                                setLocation(e.target.value);
                                console.log(location);
                            }}
                        />
                        <TextField
                            required
                            id="number"
                            label="number of players"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            onChange={(e) => {
                                setNumber(e.target.value);
                                console.log(number);
                            }}
                        />

                        <Grid spacing={2}>
                            {Object.entries(TAGS).map((tag) => {
                                return (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="error"
                                                label={tag[0]}
                                                onChange={() => {
                                                    handleTag(tag[1]);
                                                }}
                                            />
                                        }
                                        label={tag[0]}
                                    />
                                );
                            })}
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="error"
                            sx={{ mt: 3, backgroundColor: "darkred" }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </DialogContent>
                <div className="modal-content"></div>
            </Dialog>
        </>
    );
};

export default ModalCreate;
