import React, { useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import "./profile.css";
import { getUser } from "../../firebase/helpers";

const ModalApproved = ({ thePost }) => {
  //import the posts
  const [open, setOpen] = useState(false);
  const [owner, setOwner] = useState(thePost.owner);
  const [approved, setApproved] = useState(thePost.approvedUsers);
  const [current, setCurrent] = useState("");
  const [name, setName] = useState("Click on someone to see more info");
  const [discord, setDiscord] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setCurrent("");
    setName("Click on someone to see more info");
    setDiscord("");
    setApproved(thePost.approvedUsers);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrent("");
    setName("Click on someone to see more info");
    setApproved(thePost.approvedUsers);
    setEmail("");
  };

  async function handleClick(thing) {
    var person = await getUser(thing);
    setCurrent(thing);
    setName(person.name);
    setDiscord(person.discordTag);
    setEmail(thing);
    setDescription(person.description);
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
          <div className="player-info">
            <h2>Player Info</h2>
            <h3>Name: </h3>
            <p>{name}</p>
            <h3>Discord: </h3>
            <p>{discord}</p>
            <h3>Email: </h3>
            <p>{email}</p>
            <h3>About: </h3>
            <p>{description}</p>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="error"
        sx={{
          backgroundColor: "darkred",
        }}
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
            <h2>Owner</h2>
            <ul>
              <div className="modal-titles">
                {
                  <div className="modal-buttons">
                    <Button
                      size="large"
                      className="ew"
                      onClick={() => handleClick(owner)}
                      color="error"
                    >
                      {owner}
                    </Button>
                  </div>
                }
              </div>
            </ul>
            <br></br>
            <h2>Approved Members:</h2>
            <ul>
              <div className="modal-titles">
                {approved.map((item) => {
                  return (
                    <div className="modal-buttons" key={item}>
                      <Button
                        size="large"
                        className="ew"
                        onClick={() => handleClick(item)}
                        color="error"
                      >
                        {item}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </ul>
          </div>
          <div className="theSection">{<DisplayCurrent />}</div>
        </div>
        <br></br>
        <br></br>
        <DialogContent>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            sx={{ backgroundColor: "darkred", mb: 2 }}
          >
            close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalApproved;
