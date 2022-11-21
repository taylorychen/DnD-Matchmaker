import React, { useState } from "react";
import {
    getCurrentUserName,
    getCurrentUserDiscord,
    updateCurrentUserDiscord,
    updateCurrentUserName,
    getCurrentUserActivePostings,
} from "../../firebase/helpers";
import "./profile.css";
import "../Login/login.css";
import { currentUserEmail } from "../../firebase/auth";

export default function Profile() {
    const [name, setName] = useState("Your Name");
    const [discord, setDiscord] = useState("Your discord");
    const [active, setActive] = useState("edit");

    getCurrentUserName().then((response) => {
        setName(response);
    });
    getCurrentUserDiscord().then((response) => {
        if (response === null) {
            setDiscord("Your discord");
        } else {
            setDiscord(response);
        }
    });

    //Edit section
    function Edit() {
        const [tempDiscord, setTempDiscord] = useState("Your discord");
        const [tempName, setTempName] = useState(name);
        const handleSubmit = (event) => {
            event.preventDefault();
            updateCurrentUserName(tempName);
            updateCurrentUserDiscord(tempDiscord);
            getCurrentUserName().then((response) => {
                setName(response);
            });
            getCurrentUserDiscord().then((response) => {
                if (response === null) {
                    setDiscord("Your discord");
                } else {
                    setDiscord(response);
                }
            });
            console.log("Name: " + name);
            console.log("Discord: " + tempDiscord);
        };
        return (
            <div className="edit">
                <h3>EDIT PROFILE</h3>
                <form id="update" onSubmit={handleSubmit}>
                    <div className="edit-parent">
                        <div className="edit-item">
                            <label>
                                <p>Name</p>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder={name}
                                onChange={(e) => setTempName(e.target.value)}
                            />
                        </div>
                        <div className="edit-item">
                            <label>Discord</label>
                            <input
                                type="text"
                                name="discord"
                                placeholder={discord}
                                onChange={(e) => setTempDiscord(e.target.value)}
                            />
                        </div>

                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        );
    }
    //User's postings section
    function Postings() {
        let arrayPostings = [];
        getCurrentUserActivePostings().then((response) => {
            arrayPostings = response;
        });
        console.log(arrayPostings);

        const testArray = [{}, {}, {}, {}, {}];
        return (
            <div className="postings">
                <h3>MY POSTINGS</h3>
                <div className="post-grid">
                    {testArray.map((test) => {
                        return <div className="test">test card</div>;
                    })}
                </div>
            </div>
        );
    }

    //User's pending requests section
    function PendingRequests() {
        return (
            <div className="pendingRequests">
                <h3>PENDING</h3>
            </div>
        );
    }

    //User's pending requests section
    function ApprovedRequests() {
        return (
            <div className="approvedRequests">
                <h3>APPROVED</h3>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h1 className="title_txt">My Profile</h1>
            <div className="container">
                <div className="sub-container">
                    <div className="filler"></div>
                    <h3>{name}</h3>
                    <div className="profile-info">
                        <p className="info-tag">Email:</p>
                        <p className="info">{currentUserEmail()}</p>
                        <p className="info-tag">Discord:</p>
                        <p className="info">{discord}</p>
                    </div>
                </div>
                <div className="sub-container">
                    <div className="section-toggle">
                        <ul className="toggle-options">
                            <li>
                                <button onClick={() => setActive("edit")}>
                                    Edit Profile
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setActive("postings")}>
                                    My Postings
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActive("pendingRequests")}
                                >
                                    Pending
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() =>
                                        setActive("approvedRequests")
                                    }
                                >
                                    Approved
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="section">
                        {active === "edit" && <Edit />}
                        {active === "postings" && <Postings />}
                        {active === "pendingRequests" && <PendingRequests />}
                        {active === "approvedRequests" && <ApprovedRequests />}
                    </div>
                </div>
            </div>
        </div>
    );
}
