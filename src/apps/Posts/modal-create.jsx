import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField, FormControl } from "@mui/material";
import "./modal.css";
import { createPost } from "../../firebase/helpers";

// this modal component is for when users are trying to create a new post (database writing)
const ModalCreate = () => {
    const [gname, setGname] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [number, setNumber] = useState(0); 

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
    };

    const handleSubmit = () => {
        if (gname === "" || email === "" || location === "" || description === "" || number === 0){
            alert("you have to give inputs");
        }
        else{
            setOpen(false);
            createPost(email,gname,description,[],location, number);
            alert("You have successfully created a post!");
            setGname("");
            setEmail("");
            setLocation("");
            setDescription("");
            setNumber(0);
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

            <Dialog open={open}>
                <div className="modal-content">
                    <FormControl>
                        <h2>trying</h2>
                        <TextField required id="gname" label="Name the Game" variant="outlined" onChange={(e)=> {setGname(e.target.value); console.log(gname)}} />
                        <span>  </span>
                        <TextField required id="email" label="email" variant="outlined" onChange={(e)=> {setEmail(e.target.value); console.log(email)}} />
                        <TextField required id="location" label="location" variant="outlined" onChange={(e)=> {setLocation(e.target.value); console.log(location)}} />
                        <TextField required id="description" label="description" variant="outlined" onChange={(e)=> {setDescription(e.target.value); console.log(description)}} />
                        <TextField required id="number" label="number" variant="outlined" onChange={(e)=> {setNumber(e.target.value); console.log(number)}} />
                        <br></br>
                        <br></br>
                        <Button type="submit" variant="outlined" onClick={handleSubmit}>Submit</Button>
                    </FormControl>
                    <br></br>
                    <br></br>
                    <Button onClick={handleClose}>
                        close
                    </Button>
                </div>
            </Dialog>
        </>
    );
};

export default ModalCreate;
