import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./profile.css";

export default function Profile() {
    const [name, setName] = useState("Your Name");
    const [username, setUsername] = useState("Your Username");
    const [email, setEmail] = useState("Your email");
    const [discord, setDiscord] = useState("Your discord");
    const [active, setActive] = useState("edit");

    //Edit Section of the Profile
    function Edit() {
        return (
            <div className="edit">
                <h3>EDIT PROFILE</h3>
                <div className="edit-parent">
                    <div className="edit-item">
                        <label>
                            <p>Name</p>
                        </label>
                        <input type="text" name="name" placeholder={name} />
                    </div>
                    <div className="edit-item">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder={username}
                        />
                    </div>
                    <div className="edit-item">
                        <label>Email</label>
                        <input type="text" name="email" placeholder={email} />
                    </div>
                    <div className="edit-item">
                        <label>Discord</label>
                        <input
                            type="text"
                            name="discord"
                            placeholder={discord}
                        />
                    </div>
                    <button>Update</button>
                </div>
            </div>
        );
    }

    //User's postings section
    function Postings() {
        return (
            <div className="postings">
                <h3>MY POSTINGS</h3>
            </div>
        );
    }

    //User's requests section
    function Requests() {
        return (
            <div className="requests">
                <h3>MY REQUESTS</h3>
            </div>
        );
    }

    return (
        <div>
            <div className="container">
                <div className="sub-container">
                    <div className="filler"></div>
                    <h3>{name}</h3>
                    <div className="profile-info">
                        <p className="info-tag">Username:</p>
                        <p className="info">{username}</p>
                        <p className="info-tag">Email:</p>
                        <p className="info">{email}</p>
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
                                <button onClick={() => setActive("requests")}>
                                    My Requests
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="section">
                        {active === "edit" && <Edit />}
                        {active === "postings" && <Postings />}
                        {active === "requests" && <Requests />}
                    </div>
                </div>
            </div>
        </div>
    );
}
