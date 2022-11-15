import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    TextField,
    FormControl,
    Checkbox,
} from "@mui/material";
import "./modal.css";
import { createPost } from "../../firebase/helpers";
import { currentUserEmail, currentUser } from "../../firebase/auth";

// this modal component is for when users are trying to create a new post (database writing)
const ModalCreate = () => {
    const [gname, setGname] = useState("");
    const [email, setEmail] = useState("");
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
        setEmail("");
        setLocation("");
        setDescription("");
        setNumber(0);
        setTags([]);
    };

    const handleSubmit = () => {
        if (
            gname === "" ||
            email === "" ||
            location === "" ||
            description === "" ||
            number === 0
        ) {
            alert("you have to give inputs");
        } else if (currentUserEmail() != email) {
            alert("you have to use your own email!");
        } else {
            setOpen(false);
            console.log("finalTags:", tags);
            createPost(email, gname, description, tags, location, number);
            alert("You have successfully created a post!");
            setGname("");
            setEmail("");
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
            <Button
                onClick={handleOpen}
                variant="contained"
                sx={{ minWidth: 0.1, backgroundColor: "darkred", mb: 2 }}
            >
                Create
            </Button>

            <Dialog open={open}>
                <div className="modal-content">
                    <FormControl>
                        <h2>trying</h2>
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
                        <span> </span>
                        <TextField
                            required
                            id="email"
                            label="email"
                            variant="outlined"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                console.log(email);
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
                        <div>dragons:</div>
                        <Checkbox
                            label="dragons"
                            onChange={(e) => {
                                handleTag("dragon");
                            }}
                        />
                        <div>eggs:</div>
                        <Checkbox
                            label="eggs"
                            onChange={(e) => {
                                handleTag("eggs");
                            }}
                        />
                        <div>edgelord:</div>
                        <Checkbox
                            label="edgelord"
                            onChange={(e) => {
                                handleTag("edgelord");
                            }}
                        />
                        <div>roleplay:</div>
                        <Checkbox
                            label="roleplay"
                            onChange={(e) => {
                                handleTag("roleplay");
                            }}
                        />
                        <div>wizards:</div>
                        <Checkbox
                            label="wizards"
                            onChange={(e) => {
                                handleTag("wizards");
                            }}
                        />
                        <br></br>
                        <br></br>
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
