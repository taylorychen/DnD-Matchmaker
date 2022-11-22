import React, { useState } from "react";
import "./modal.css";
import { useEffect } from "react";

// this modal component is for when users are trying to find out more info about a post (database reading)
const ModalInfo = () => {
    const [groupName, setGroupName] = useState("");
    const [location, setLocation] = useState("");
    const [NumberOfPlayers, setNum] = useState("");
    const [AvailibleSpots, setAvailible] = useState("");
    const [Description, setDescription] = useState("");

    const displayCards = async () => {
        try {
            setLocation("The Dungeon De Neve");
            setGroupName("DnD Fun Game");
            setNum("6");
            setAvailible("2");
            setDescription(
                "asldkfja;s aslkfjaslk;d jaj asfljaj sadlkfjas; jafsaldjfslfj sldkfja;s aslkfjaslk;d jaj asfljaj sadlkfjas; jafsaldjfslfjsldkfja;s aslkfjaslk;d jaj asfljaj sadlkfjas; jafsaldjfslfjsldkfja;s aslkfjaslk;d jaj asfljaj sadlkfjas; jafsaldjfslfj"
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        displayCards();
    }, []);

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <button className="prettyButton" onClick={toggleModal}>
                More Info
            </button>

            {modal && (
                <div className="stuff">
                    <div onClick={toggleModal} className="stuff"></div>
                    <div className="modal-content">
                        <h1 className="lol">{groupName.addClass("lol")}</h1>
                        <p className="info"> Location: {location}</p>
                        <p className="info">
                            {" "}
                            Number of Players: {NumberOfPlayers}
                        </p>
                        <p className="info"> Spots Left: {AvailibleSpots}</p>
                        <p className="info"> Description: {Description}</p>
                        <br></br>
                        <button className="prettyButton">Join Request</button>

                        <button className="close" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalInfo;
