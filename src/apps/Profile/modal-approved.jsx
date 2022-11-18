import React, { useState } from "react";
import { Button, Dialog, Grid } from "@mui/material";
import "./profile.css";
import { getUser } from "../../firebase/helpers";

// this modal component is for when users are trying to create a new post (database writing)
const ModalApproved = ({ thePost }) => {
    //import the posts
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState(thePost.owner);
    const [approved, setApproved] = useState(thePost.approvedUsers);
    const [current, setCurrent] = useState("");
    const [thePostID, setThePostID] = useState(
        `${thePost.owner}_${thePost.date.seconds}.${thePost.date.nanoseconds}`
    );
    const [name, setName] = useState("Click on someone to see more info");
    const [discord, setDiscord] = useState("");
    const [email, setEmail] = useState("");

    const handleOpen = () => {
        setOpen(true);
        setCurrent("");
        setName("Click on someone to see more info");
        setDiscord("");
        setApproved(thePost.approvedUsers);
    };

    const handleClose = () => {
        setCurrent("");
        setName("Click on someone to see more info");
        setOpen(false);
        setApproved(thePost.approvedUsers);
        setEmail("");
    };

    async function handleClick(thing) {
        var person = await getUser(thing);
        setCurrent(thing);
        setName(person.name);
        setDiscord(person.discordTag);
        setEmail(thing);
        console.log("discord", person.discordTag);
        console.log("discord", person); //this is a promise
    }

    function DisplayCurrent(theEmail) {
        if (current == "") {
            return (
                <>
                    <h3>{name}</h3>
                </>
            );
        } else {
            return (
                <>
                    <h2>Player Info</h2>
                    <h3>Name: {name}</h3>
                    <h3>Discord: {discord}</h3>
                    <h3>Email: {email}</h3>
                </>
            );
        }
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="contained"
                sx={{ minWidth: 0.1, backgroundColor: "darkred", mb: 2 }}
            >
                Approved
            </Button>

            <Dialog open={open} fullWidth maxWidth="sm">
                <div className="modal-content"></div>
                <div className="theContainer">
                    <br></br>
                    <div className="theSection">
                        <h1>{thePost.title}</h1>
                        <br></br>
                        <h2>Approved Members:</h2>
                        <ul>
                            {approved.map((item) => {
                                return (
                                    <Button
                                        className="ew"
                                        onClick={() => handleClick(item)}
                                        color="error"
                                    >
                                        {item}
                                    </Button>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="theSection">{<DisplayCurrent />}</div>
                </div>
                <br></br>
                <br></br>
                <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{ minWidth: 0.1, backgroundColor: "darkred", mb: 2 }}
                >
                    close
                </Button>
                <br></br>
                <br></br>
            </Dialog>
        </>
    );
};

export default ModalApproved;
