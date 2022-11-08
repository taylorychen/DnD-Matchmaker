import React, { useState } from "react";
import "./modal.css";

// this modal component is for when users are trying to create a new post (database writing)
const ModalCreate = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button onClick={toggleModal} className="button-modal">
        Create a New Game Posting
      </button>

      {modal && (
        <div className="text">
          <div onClick={toggleModal} className="text"></div>
          <div className="modal-content">
            <h2>New Post</h2>
            <label>Game Name:  </label>
            <input type="text" name="gname" required />
            <br></br> 
            <label>Number of Players: </label>
            <input type="number" name="numOfPlayers" required />
            <br></br>
            <label>Location: </label>
            <input type="text" name="location" required />
            <br></br>
            <label>Description: </label>
            <textarea rows = "5" cols = "60" name = "description"></textarea>
            <br></br>

            <label>Tags: </label>
            <input type="checkbox" name="tag" value="fantasy" required/>fantasy 
            <input type="checkbox" name="tag" value="dragons" required/>dragons 
            <input type="checkbox" name="tag" value="roleplay" required/>roleplay 
            <input type="checkbox" name="tag" value="pathfinder" required/>pathfinder 
            <input type="checkbox" name="tag" value="eggs" required/>eggs 
            <input type="checkbox" name="tag" value="eggs" required/>other 
            <br></br>
            <br></br>

          
            <input type = "submit" value = "submit" />
            <br></br>
            <br></br>
            <button className="close" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalCreate;