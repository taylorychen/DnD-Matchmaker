import React, { useState } from "react";
import { Button, Dialog, Grid } from "@mui/material";
import "./profile.css";
import {
    getUser,
    approveOrDenyRequestToJoinGroup,
} from "../../firebase/helpers";

// this modal component is for when users are trying to create a new post (database writing)
const ModalRequests = ({ thePost }) => {
    //import the posts
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState(thePost.owner);
    const [requests, setRequests] = useState(thePost.pendingUsers);
    const [current, setCurrent] = useState("");
    const [thePostID, setThePostID] = useState(
        `${thePost.owner}_${thePost.date.seconds}.${thePost.date.nanoseconds}`
    );
    const [name, setName] = useState("Click on someone to see more info");

    const handleOpen = () => {
        setOpen(true);
        console.log("the Owner", owner);
        console.log(requests);
        setCurrent("");
        setName("Click on someone to see more info");
    };

    const handleClose = () => {
        setCurrent("");
        setName("Click on someone to see more info");
        setOpen(false);
    };

    const handleClick = (thing) => {
        console.log("------------------");
        console.log("the name of the button:", thing);
        console.log("the name BEFORE:", current);
        setCurrent(thing);
        setName(thing);
        console.log("the name NOW:", current);
        console.log("------------------");
    };

    const handleAppOrD = (thePostID, theBool) => {
        if (theBool) {
            approveOrDenyRequestToJoinGroup(thePostID, current, true);
            setRequests(thePost.pendingUsers);
            alert(
                "you have approved a member, please refresh the page to see the update"
            );
        } else {
            approveOrDenyRequestToJoinGroup(thePostID, current, false);
            setRequests(thePost.pendingUsers);
            alert(
                "you have denied this person, please refresh the page to see the update"
            );
        }
    };

    function DisplayCurrent(theEmail) {
        var person = getUser(theEmail);
        if (current == "") {
            return (
                <>
                    <h3>{name}</h3>
                </>
            );
        } else {
            return (
                <>
                    <h3>{name}</h3>
                    <br></br>
                    <br></br>
                    <Button
                        onClick={() => handleAppOrD(thePostID, true)}
                        color="success"
                    >
                        Approve
                    </Button>
                    <Button
                        onClick={() => handleAppOrD(thePostID, false)}
                        color="error"
                    >
                        Deny
                    </Button>
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
                Requests
            </Button>

            <Dialog open={open} fullWidth maxWidth="sm">
                <div className="modal-content">
                    <div className="theContainer">
                        <br></br>
                        <div className="theSection">
                            <h1>{thePost.title}</h1>
                            <br></br>
                            <h2>Pending Requests:</h2>
                            <ul>
                                {requests.map((item) => {
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
                    <Button onClick={handleClose}>close</Button>
                </div>
            </Dialog>
        </>
    );
};

export default ModalRequests;
