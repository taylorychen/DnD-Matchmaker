import React from "react";
import { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Grid,
} from "@mui/material";
import "./posting-card.css";
import ModalRequests from "../Profile/modal-requests";
import ModalApproved from "../Profile/modal-approved";
import {
    deletePost,
    setActive,
    setInactive,
    requestToJoinGroup,
    isCurrentUserRequestPending,
    isCurrentUserRequestApproved,
    leaveGroup,
} from "../../firebase/helpers";
import { currentUserEmail } from "../../firebase/auth";
import ModalInfo from "./modal-info";

//this is for the general posting cards that will appear in both the postings page and the profile page
const PostingCards = ({ post }) => {
    const [postID, setPostID] = useState(postToID(post));
    const [isRequested, setisRequested] = useState(false);
    const [isApproved, setisApproved] = useState(false);
    const [isActive, setisActive] = useState(post.isActive);

    const handleRequest = () => {
        if (post.owner === currentUserEmail()) {
            alert("can not join your own group");
        } else if (isApproved) {
            //if already joined, you probably are trying to leave
            leaveGroup(postID);
            setisApproved(false);
        } else if (!isRequested) {
            //if you have not requested yet
            requestToJoinGroup(postID);
            setisRequested(true);
        } else if (isRequested) {
            leaveGroup(postID);
            setisRequested(false);
        }
    };

    //checking for previous request
    async function checkifRequested() {
        var status = await isCurrentUserRequestPending(postToID(post));
        if (status) {
            setisRequested(true);
        } else {
            setisRequested(false);
        }
    }

    //checking if you are already part of this group
    async function checkifApproved() {
        var status = await isCurrentUserRequestApproved(postToID(post));
        if (status) {
            setisApproved(true);
        } else {
            setisApproved(false);
        }
    }

    const handleDelete = () => {
        deletePost(postToID(post), post.owner);
    };

    const handleActivation = (theBool) => {
        if (theBool) {
            //if it is true meaning IT IS active, deactivate it
            setisActive(false);
            setInactive(postToID(post), post.owner);
        } else {
            //if it is FALSE meaning it is NOT active, activate it
            setisActive(true);
            setActive(postToID(post), post.owner);
        }
    };

    const displayCorrectButtons = () => {
        if (post.owner === currentUserEmail() && post.isActive === true) {
            //if it is your own post
            return (
                <>
                    <Grid
                        container
                        columns={16}
                        spacing={1}
                        alignItems="center"
                    >
                        <Grid item xs={1} />
                        <Grid item xs={4} j>
                            <ModalRequests thePost={post}></ModalRequests>
                        </Grid>
                        <Grid item xs={1} />

                        <Grid item xs={4}>
                            <ModalApproved thePost={post}></ModalApproved>
                        </Grid>
                        <Grid item xs={1} />

                        <Grid item xs={4}>
                            <ModalInfo thePost={post}></ModalInfo>
                        </Grid>
                        <Grid item xs={1} />

                        <Grid item xs={1} />
                        <Grid item xs={7}>
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
                        </Grid>
                        <Grid item xs={8}>
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
                        </Grid>
                    </Grid>
                </>
            );
        } else if (
            post.owner === currentUserEmail() &&
            post.isActive === false
        ) {
            return (
                <>
                    <Grid
                        container
                        columns={16}
                        spacing={1}
                        alignItems="center"
                    >
                        <Grid item xs={1} />
                        <Grid item xs={4} j>
                            <ModalRequests thePost={post}></ModalRequests>
                        </Grid>
                        <Grid item xs={1} />

                        <Grid item xs={4}>
                            <ModalApproved thePost={post}></ModalApproved>
                        </Grid>
                        <Grid item xs={1} />

                        <Grid item xs={4}>
                            <ModalInfo thePost={post}></ModalInfo>
                        </Grid>
                        <Grid item xs={1} />

                        <Grid item xs={1} />
                        <Grid item xs={7}>
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
                        </Grid>
                        <Grid item xs={8}>
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
                        </Grid>
                    </Grid>
                </>
            );
        } else {
            checkifRequested();
            checkifApproved();
            //if it is indeed someone else's post
            if (isRequested === true) {
                return (
                    <>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={4}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                        handleRequest(postID);
                                    }}
                                >
                                    Unrequest
                                </Button>
                            </Grid>
                            <Grid item xs={5} />
                            <Grid item xs={3}>
                                <ModalInfo thePost={post}></ModalInfo>
                            </Grid>
                        </Grid>
                    </>
                );
            } else if (isApproved === true) {
                return (
                    <>
                        <Grid container alignItems="center">
                            <Grid item xs={3}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                        handleRequest(postID);
                                    }}
                                >
                                    Leave
                                </Button>
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={4}>
                                <ModalApproved thePost={post} />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={3}>
                                <ModalInfo thePost={post} />
                            </Grid>
                        </Grid>
                    </>
                );
            } else {
                //if you have not requested/joined yet
                return (
                    <>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={4}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                        handleRequest(postID);
                                    }}
                                >
                                    Request
                                </Button>
                            </Grid>
                            <Grid item xs={5} />
                            <Grid item xs={3}>
                                <ModalInfo thePost={post}></ModalInfo>
                            </Grid>
                        </Grid>
                    </>
                );
            }
        }
    };

    return (
        <Card variant="outlined" sx={{ width: 345, boxShadow: 5 }}>
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
            </CardContent>
            <CardActions>{displayCorrectButtons()}</CardActions>
        </Card>
    );
};

function postToID(post) {
    return `${post.owner}_${post.date.seconds}.${post.date.nanoseconds}`;
}

export default PostingCards;
