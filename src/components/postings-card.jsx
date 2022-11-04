import React from "react";
import { useState, useEffect } from "react";
import "./posting-card.css";

const PostingCards = () => {
  const [groupName, setGroupName] = useState("");
  const [location, setLocation] = useState("");
  const [NumberOfPlayers, setNum] = useState("");
  const [AvailibleSpots, setAvailible] = useState("");

  const displayCards = async () => {
    try {
      setLocation("Location: The Dungeon De Neve");
      setGroupName("DnD Fun Game");
      setNum("Number of Players: 6");
      setAvailible("Spots Left: 2");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayCards();
  }, []);

  return (
    <div className="main">
      <div className="card">
        <h1>{groupName}</h1>
        <p className="info">{location}</p>
        <p className="info">{NumberOfPlayers}</p>
        <p className="info">{AvailibleSpots}</p>
        <p>
          <button>Join Request</button>
          <span className="span"></span>
          <button>More Info</button>
        </p>
      </div>
      <button onClick={() => displayCards()}>Next Page</button>
    </div>
  );
};

export default PostingCards;