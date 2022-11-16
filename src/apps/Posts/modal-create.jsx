import React, { useState } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import "./modal.css";

// this modal component is for when users are trying to create a new post (database writing)
const ModalCreate = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
            <Dialog open={open} onClose={handleClose}>
                <div className="modal-content">
                    <h2>New Post</h2>
                    <label>Game Name: </label>
                    <input type="text" name="gname" required />
                    <label>Number of Players: </label>
                    <input type="number" name="numOfPlayers" required />
                    <label>Location: </label>
                    <input type="text" name="location" required />
                    <label>Description: </label>
                    <textarea rows="5" cols="60" name="description"></textarea>
                    <label>Tags: </label>
                    <input
                        type="checkbox"
                        name="tag"
                        value="fantasy"
                        required
                    />
                    fantasy
                    <input
                        type="checkbox"
                        name="tag"
                        value="dragons"
                        required
                    />
                    dragons
                    <input
                        type="checkbox"
                        name="tag"
                        value="roleplay"
                        required
                    />
                    roleplay
                    <input
                        type="checkbox"
                        name="tag"
                        value="pathfinder"
                        required
                    />
                    pathfinder
                    <input type="checkbox" name="tag" value="eggs" required />
                    eggs
                    <input type="checkbox" name="tag" value="eggs" required />
                    other
                    <br></br>
                    <br></br>
                    <input type="submit" value="submit" />
                    <br></br>
                    <br></br>
                    <button className="close" onclick={handleClose}>
                        CLOSE
                    </button>
                </div>
            </Dialog>
        </>
    );
};

export default ModalCreate;
