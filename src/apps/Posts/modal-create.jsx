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
import dragon_red from "../../images/dragon_red.webp";

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
            isNaN(parseInt(number)) ||
            parseInt(number) <= 0
        ) {
            alert("Your inputs are missing or invalid!");
        } else {
            setOpen(false);
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
                parseInt(number)
            );
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
        } else if (theTag === "t_oneShot") {
            setOneShot(!oneShot);
        } else if (theTag === "t_campaign") {
            setCampaign(!campaign);
        } else if (theTag === "t_homebrew") {
            setHomebrew(!homebrew);
        } else {
            setPrewritten(!prewritten);
        }
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="contained"
                color="error"
                sx={{ backgroundColor: "darkred" }}
            >
                Create
            </Button>

            <Dialog open={open} sx={{ Width: 700 }} maxWidth="lg">
                <DialogContent>
                    <FormControl>
                        <h1 className="create_post">Create A New Game Post</h1>
                        <button
                            className="x non-mui-button"
                            onClick={handleClose}
                        >
                            X
                        </button>
                        <h1 className="create_post2">Start An Adventure</h1>
                        <Grid container>
                            <Grid item xs={5}>
                                <img
                                    className="image_side"
                                    src={dragon_red}
                                    alt="loading..."
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <h1 className="create_post2">
                                    Describe Your Game
                                </h1>
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
                                    }}
                                />

                                <TextField
                                    required
                                    fullWidth
                                    id="location"
                                    label="location"
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                    onChange={(e) => {
                                        setLocation(e.target.value);
                                    }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="number"
                                    label="number of players"
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                    onChange={(e) => {
                                        setNumber(e.target.value);
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
                                    }}
                                />

                                <Grid>
                                    {Object.entries(TAGS).map((tag) => {
                                        return (
                                            <FormControlLabel
                                                key={tag[0]}
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
                                <button
                                    className="button_submit non-mui-button"
                                    type="submit"
                                    variant="outlined"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </DialogContent>
                <div className="modal-content"></div>
            </Dialog>
        </>
    );
};

export default ModalCreate;
