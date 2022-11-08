import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./posting-card.css";
import { deletePost, setActive, setInactive } from "../firebase/helpers";

const PostingCards = ({ post }) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="title">
          {post.title}
        </Typography>
        <Typography variant="body1">Location: {post.location}</Typography>
        <Typography variant="body1">
          Open Spots: {post.maxPlayers - post.currPlayers}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          Request to Join
        </Button>
        <Button
          onClick={() => {
            deletePost(
              `${post.owner}_${post.date.seconds}.${post.date.nanoseconds}`,
              post.owner
            );
          }}
          size="small"
          variant="outlined"
          color="error"
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            setActive(
              `${post.owner}_${post.date.seconds}.${post.date.nanoseconds}`,
              post.owner
            );
          }}
          size="small"
          variant="outlined"
          color="success"
        >
          Activate
        </Button>
        <Button
          onClick={() => {
            setInactive(
              `${post.owner}_${post.date.seconds}.${post.date.nanoseconds}`,
              post.owner
            );
          }}
          size="small"
          variant="outlined"
          color="error"
        >
          Deactivate
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostingCards;
