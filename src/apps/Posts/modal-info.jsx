import React, { useState } from "react";
import { Button, Dialog } from "@mui/material";
import "./posting-card.css";

// this modal component is for when users are trying to find out more info about a post (database reading)
const ModalInfo = ({ thePost }) => {
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState(thePost.owner);
    const [description, setDescription] = useState(thePost.description);
    const [location, setLocation] = useState(thePost.location);
    const [title, setTitle] = useState(thePost.title);
    const [lRules, setLRules] = useState(thePost.t_looseRules);
    const [oneshot, setOneShot] = useState(thePost.t_oneShot);
    const [campaign, setCampaign] = useState(thePost.t_campaign);
    const [homebrew, setHomebrew] = useState(thePost.t_homebrew);
    const [preWritten, setPrewritten] = useState(thePost.t_preWritten);
    const [tags, setTags] = useState([]);

    const handleOpen = () => {
        setOpen(true);
        handleTags();
        console.log(tags);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTags = () => {
        var temp = [];
        if (lRules) {
            temp.push("Loose Rules");
        }
        if (oneshot) {
            temp.push("Oneshot");
        }
        if (campaign) {
            temp.push("Campaign");
        }
        if (homebrew) {
            temp.push("Homebrew");
        }
        if (preWritten) {
            temp.push("Prewritten");
        }
        setTags(temp);
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="contained"
                color="error"
                sx={{ backgroundColor: "darkred" }}
            >
                Info
            </Button>

            <Dialog open={open} fullWidth maxWidth="sm">
                <div className="modal-content"></div>
                <br></br>
                <br></br>
                <br></br>
                <h1>Game Info</h1>
                <h3>Title: </h3>
                <p>{title}</p>
                <br></br>
                <h3>Location: </h3>
                <p>{location}</p>
                <br></br>
                <h3>Dungeon Master: </h3>
                <p>{owner}</p>
                <br></br>
                <h3>Description: </h3>
                <p className="pad">{description}</p>
                <br></br>
                <h3>Tags: </h3>
                <ul>
                    {tags.map((item) => {
                        return <li>{item}</li>;
                    })}
                </ul>
                <br></br>
                <br></br>
                <Button
                    onClick={handleClose}
                    variant="contained"
                    color="error"
                    sx={{ backgroundColor: "darkred", mb: 2 }}
                >
                    close
                </Button>
                <br></br>
                <br></br>
            </Dialog>
        </>
    );
};

export default ModalInfo;
