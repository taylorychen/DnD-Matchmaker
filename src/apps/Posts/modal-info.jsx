import React, { useState } from "react";
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
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
                <DialogContent>
                    <br></br>
                    <h1>{title}</h1>

                    <Typography variant="h6">
                        <strong>Location:</strong>
                    </Typography>
                    <Typography variant="body1">{location}</Typography>
                    <br></br>

                    <Typography variant="h6">
                        <strong>Dungeon Master:</strong>
                    </Typography>
                    <Typography variant="body1">{owner}</Typography>
                    <br></br>

                    <Typography variant="h6">
                        <strong>Description:</strong>
                    </Typography>
                    <Typography variant="body1">{description}</Typography>
                    <br></br>

                    <Typography variant="h6">
                        <strong>Tags:</strong>
                    </Typography>
                    {tags.map((item) => {
                        return <Typography variant="body1">{item}</Typography>;
                    })}
                    <br></br>
                    <br></br>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="error"
                        sx={{ backgroundColor: "darkred" }}
                    >
                        close
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ModalInfo;
