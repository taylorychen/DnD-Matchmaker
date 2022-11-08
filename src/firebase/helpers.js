import { db } from "./config";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

/**
 * get user based on email
 * @param {string} email
 * @returns user's data
 */
export async function getUser(email) {
  const user = await getDoc(doc(db, "/Users/" + email));
  if (user.exists()) {
    return user.data();
  }
  return null;
}

/**
 * creates user with given attributes
 * @param {string} email
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} discordTag
 */
export async function createUser(email, firstName, lastName, discordTag) {
  const userRef = doc(db, "/Users/" + email);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    console.log(`user ${email} already exists`);
    return true;
  }
  setDoc(userRef, {
    email: email,
    firstName: firstName,
    lastName: lastName,
    discordTag: discordTag,
    activePostings: [],
    inactivePostings: [],
    approvedRequests: [],
    pendingRequests: [],
  });
  console.log(`CREATED user ${email}`);
  return false;
}

/**
 * creates a post with the given attributes
 * @param {string} email
 * @param {string} title
 * @param {string} description
 * @param {Array.<string>} tags
 * @param {string} location
 * @param {number} maxPlayers
 */
export async function createPost(
  email,
  title,
  description,
  tags,
  location,
  maxPlayers
) {
  const ownerRef = doc(db, "Users", email);
  const userSnap = await getDoc(ownerRef);
  if (!userSnap.exists()) {
    console.log(`user ${email} not found`);
    return false;
  }
  const now = Timestamp.now();
  const postId = `${email}_${now.seconds}.${now.nanoseconds}`;
  setDoc(doc(db, "Posts", postId), {
    owner: email,
    title: title,
    description: description,
    tags: tags,
    date: now,
    location: location,
    maxPlayers: maxPlayers,
    currPlayers: 0,
    isActive: true,
    approvedUsers: [],
    pendingUsers: [],
  }).then(() => {
    updateDoc(ownerRef, {
      activePostings: arrayUnion(postId),
    });
  });

  console.log(`CREATED post for ${email}`);
  return true;
}

/**
 * Delete post with specified postId
 * @param {string} postId
 * @param {string} owner
 */
export async function deletePost(postId, owner) {
  if (!validPostOwner(postId, owner)) {
    console.log("invalid post owner");
    return false;
  }

  // get refs to documents
  const ownerRef = doc(db, "Users", owner);
  const postRef = doc(db, "Posts", postId);
  deleteDoc(postRef).then(() => {
    updateDoc(ownerRef, {
      activePostings: arrayRemove(postId),
    });
  });
  console.log(`DELETED post ${postId}`);
  return true;
}

/**
 * set post to active
 * @param {string} postId
 * @param {string} owner
 */
export async function setActive(postId, owner) {
  if (!validPostOwner(postId, owner)) {
    console.log("invalid post owner");
    return false;
  }

  // get refs to documents
  const ownerRef = doc(db, "Users", owner);
  const postRef = doc(db, "Posts", postId);

  updateDoc(postRef, {
    active: true,
  })
    // add to active postings
    .then(() => {
      updateDoc(ownerRef, {
        activePostings: arrayUnion(postId),
      });
    })
    // remove from inactive postings
    .then(() => {
      updateDoc(ownerRef, {
        inactivePostings: arrayRemove(postId),
      });
    });
  console.log(`set post ${postId} to ACTIVE`);
  return true;
}

/**
 * set post to inactive
 * @param {string} postId
 * @param {string} owner
 */
export async function setInactive(postId, owner) {
  if (!validPostOwner(postId, owner)) {
    console.log("invalid post owner");
    return false;
  }

  // get refs to documents
  const ownerRef = doc(db, "Users", owner);
  const postRef = doc(db, "Posts", postId);
  updateDoc(postRef, {
    active: false,
  })
    // add to inactive postings
    .then(() => {
      updateDoc(ownerRef, {
        inactivePostings: arrayUnion(postId),
      });
    })
    // remove from active postings
    .then(() => {
      updateDoc(ownerRef, {
        activePostings: arrayRemove(postId),
      });
    });
  console.log(`set post ${postId} to INACTIVE`);
  return true;
}

/**
 * verifies that the postId matches the owner
 * @param {string} postId
 * @param {string} owner
 */
const validPostOwner = (postId, owner) => {
  if (owner.length >= postId.length) return false;
  return postId.substring(0, owner.length) === owner;
};

export async function requestToJoinGroup(postID, userID) {
  // given a user and a post, try to join the post's "pendingUsers" and update user's "pendingRequests"

  // check if user exists (is this necessary?)
  const userRef = doc(db, "/Users/" + userID);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    return;
  }

  // check if user is in the group (approved) already
  // const userReqests = userSnap.data().approvedRequests;
  // const postRef = doc(db, "/Posts" + postID);
  // const postSnap = await getDoc(postRef);
  // const postRequests = postSnap.data().approvedUsers;
  // if (postRequests.includes(userID) || userReqests.includes(postID)) {
  //   return;
  // }

  // add user to post's pendingUsers
  const postRef = doc(db, "/Posts" + postID);
  updateDoc(postRef, {
    pendingUsers: arrayUnion(userID),
  });

  // add post to user's pendingRequests
  updateDoc(userRef, {
    pendingRequests: arrayUnion(postID),
  });
}

export async function approveRequestToJoinGroup(postID, userID) {}
