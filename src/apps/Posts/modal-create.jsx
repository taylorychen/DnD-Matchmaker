import React, { useState } from "react";
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
                sRules,
                lRules,
                oneShot,
                campaign,
                homebrew,
                prewritten,
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

    const [sRules, setSRules] = useState(false);
    const [lRules, setLRules] = useState(false);
    const [oneShot, setOneShot] = useState(false);
    const [campaign, setCampaign] = useState(false);
    const [homebrew, setHomebrew] = useState(false);
    const [prewritten, setPrewritten] = useState(false);

    const handleTag = (theTag) => {
        if (theTag == "sRules") {
            setSRules(!sRules);
            console.log("sRules:", sRules);
        } else if (theTag == "lRules") {
            setLRules(!lRules);
            console.log("lRules:", lRules);
        } else if (theTag == "oneShot") {
            setOneShot(!oneShot);
            console.log("oneshot:", oneShot);
        } else if (theTag == "campaign") {
            setCampaign(!campaign);
            console.log("campaign:", campaign);
        } else if (theTag == "homebrew") {
            setHomebrew(!homebrew);
            console.log("hombrew:", homebrew);
        } else {
            setPrewritten(!prewritten);
            console.log("prewritten:", prewritten);
        }
    };

    return (
        <>
            <Button
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
                                            handleTag("sRules");
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
                                            handleTag("lRules");
                                        }}
                                    />
                                }
                                label="Loose Rules"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="Homebrew"
                                        onChange={(e) => {
                                            handleTag("homebrew");
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
                                            handleTag("prewritten");
                                        }}
                                    />
                                }
                                label="Pre-written"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="Campaign"
                                        onChange={(e) => {
                                            handleTag("campaign");
                                        }}
                                    />
                                }
                                label="Campaign"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        label="OneShot"
                                        onChange={(e) => {
                                            handleTag("oneShot");
                                        }}
                                    />
                                }
                                label="One Shot"
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
