import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./posting-card.css";
import ModalInfo from "./modal-info";
import {
    deletePost,
    setActive,
    setInactive,
    requestToJoinGroup,
    isCurrentUserRequestPending,
    isCurrentUserRequestApproved,
} from "../../firebase/helpers";
import { currentUserEmail } from "../../firebase/auth";

const PostingCards = ({ post }) => {
    const [postID, setPostID] = useState(
        `${post.owner}_${post.date.seconds}.${post.date.nanoseconds}`
    );
    const [isRequested, setisRequested] = useState(false);
    const [isApproved, setisApproved] = useState(false);
    const [isActive, setisActive] = useState(post.isActive);

    const handleRequest = (idkanymorebruh) => {
        if (post.owner == currentUserEmail()) {
            alert("can not join your own group");
        } else {
            requestToJoinGroup(postID);
            alert("request succesfully sent");
            setisRequested(true);
        }
    };

    //checking for previous request
    async function checkifRequested() {
        var status = await isCurrentUserRequestPending(
            `${post.owner}_${post.date.seconds}.${post.date.nanoseconds}`
        );
        console.log(status);
        if (status) {
            setisRequested(true);
        } else {
            setisRequested(false);
        }
    }

    //checking if you are already part of this group
    async function checkifApproved() {
        var status = await isCurrentUserRequestApproved(
            `${post.owner}_${post.date.seconds}.${post.date.nanoseconds}`
        );
        console.log(status);
        if (status) {
            setisApproved(true);
        } else {
            setisApproved(false);
        }
    }

    const handleDelete = () => {
        deletePost(
            `${post.owner}_${post.date.seconds}.${post.date.nanoseconds}`,
            post.owner
        );
        alert(
            "Your game " +
                post.title +
                " has been officially deleted, please refresh the page"
        );
    };

    const handleActivation = (theBool) => {
        if (theBool) {
            //if it is true meaning IT IS active, deactivate it
            console.log("1", post.isActive, "state:", isActive);
            setisActive(false);
            setInactive(
                `${post.owner}_${post.date.seconds}.${post.date.nanoseconds}`,
                post.owner
            );
            console.log("after function:", post.isActive);
            alert("your post has been deactivated");
        } else {
            //if it is FALSE meaning it is NOT active, activate it
            console.log("2x", post.isActive, "state", isActive);
            setisActive(true);
            setActive(
                `${post.owner}_${post.date.seconds}.${post.date.nanoseconds}`,
                post.owner
            );
            console.log("after function:", post.isActive);
            alert("your post has been activated!");
        }
    };

    const displayCorrectButtons = () => {
        if (post.owner == currentUserEmail() && post.isActive == true) {
            //if it is your own post
            return (
                <>
                    <Button
                        onClick={() => {
                            handleDelete();
                        }}
                        size="small"
                        variant="outlined"
                        color="error"
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={() => {
                            handleActivation(isActive);
                        }}
                        size="small"
                        variant="outlined"
                        color="error"
                    >
                        Deactivate
                    </Button>
                </>
            );
        } else if (post.owner == currentUserEmail() && post.isActive == false) {
            return (
                <>
                    <Button
                        onClick={() => {
                            handleDelete();
                        }}
                        size="small"
                        variant="outlined"
                        color="error"
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={() => {
                            handleActivation(isActive);
                        }}
                        size="small"
                        variant="outlined"
                        color="success"
                    >
                        Activate
                    </Button>
                </>
            );
        } else {
            checkifRequested();
            checkifApproved();
            //if it is indeed someone else's post
            if (isRequested == true) {
                return (
                    <Button>already requested</Button>
                    // console.log("you have already requested this group LOL")
                );
            } else if (isApproved == true) {
                return (
                    <Button>you are already part of this group!!</Button>
                    // console.log("you have already requested this group LOL")
                );
            } else {
                //if you have not requested/joined yet
                return (
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                            handleRequest(postID);
                        }}
                    >
                        Request to Join
                    </Button>
                );
            }
        }
    };

    return (
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="title"
                >
                    {post.title}
                </Typography>
                <Typography variant="body1">
                    Location: {post.location}
                </Typography>
                <Typography variant="body1">
                    Players: {post.currPlayers}/{post.maxPlayers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.description}
                </Typography>
            </CardContent>
            <CardActions>{displayCorrectButtons()}</CardActions>
        </Card>
    );
};

export default PostingCards;
