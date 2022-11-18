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
import { currentUserEmail } from "./auth";

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
 * get post based on post ID
 * @param {string} email
 * @returns user's data
 */
export async function getPost(postID) {
  const post = await getDoc(doc(db, "/Posts/" + postID));
  if (post.exists()) {
    return post.data();
  }
  return null;
}

/**
 * creates user with given attributes
 * @param {string} email
 * @param {string} fullname
 * @param {string} discordTag
 * @param {string} description
 */
export async function createUser(email, fullname) {
  const userRef = doc(db, "/Users/" + email);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    console.log(`user ${email} already exists`);
    return true;
  }
  setDoc(userRef, {
    email: email,
    name: fullname,
    discordTag: null,
    description: null,
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
  strictRules,
  looseRules,
  oneShot,
  campaign,
  homebrew,
  preWritten,
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
    t_strictRules: strictRules,
    t_looseRules: looseRules,
    t_oneShot: oneShot,
    t_campaign: campaign,
    t_homebrew: homebrew,
    t_preWritten: preWritten,
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
 * @param {string} postId (post's email)
 * @param {string} owner (user's email)
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

  const ownerRef = doc(db, "/Users/" + owner);
  const postRef = doc(db, "/Posts/" + postId);

  updateDoc(postRef, {
    isActive: true,
  })
    // add to active postings and delete inactive ones
    .then(() => {
      updateDoc(ownerRef, {
        activePostings: arrayUnion(postId),
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
  const ownerRef = doc(db, "/Users/" + owner);
  const postRef = doc(db, "/Posts/" + postId);
  updateDoc(postRef, {
    isActive: false,
  })
    // remove from active postings and add to inactive postings
    .then(() => {
      updateDoc(ownerRef, {
        activePostings: arrayRemove(postId),
        inactivePostings: arrayUnion(postId),
      });
    });
  console.log(`set post ${postId} to INACTIVE`);
  return true;
}

/**
 * returns if the current user owns the post with ID postID
 * @param {string} postID
 * @returns {boolean}
 */
export async function isCurrentUserPostOwner(postID) {
  return currentUserEmail()
    ? validPostOwner(postID, currentUserEmail())
    : false;
}

/**
 * returns T/F if the current user is part of the post's approvedUsers
 * returns null if no current user or nonexistant post
 * @param {string} postID
 * @returns {boolean | null}
 */
export async function isCurrentUserRequestApproved(postID) {
  const user = currentUserEmail();
  if (!user) {
    console.log("isCurrentUserRequestApproved: Not signed in");
    return null;
  }

  // I think we can assume the user exists

  // get the post's data
  const postRef = doc(db, "/Posts/" + postID);
  const postSnap = await getDoc(postRef);
  if (!postSnap.exists()) {
    return null;
  }
  const approvedUsers = postSnap.data().approvedUsers;

  // see if approvedUsers contains the current user
  return approvedUsers.includes(user);
}

/**
 * returns T/F if the current user is part of the post's pendingUsers
 * returns null if no current user or nonexistant post
 * @param {string} postID
 * @returns {boolean | null}
 */

export async function isCurrentUserRequestPending(postID) {
  const user = currentUserEmail();
  if (!user) {
    console.log("isCurrentUserRequestPending: Not signed in");
    return null;
  }

  // I think we can assume the user exists

  // get the post's data
  const postRef = doc(db, "/Posts/" + postID);
  const postSnap = await getDoc(postRef);
  if (!postSnap.exists()) {
    return null;
  }
  const pendingUsers = postSnap.data().pendingUsers;

  // see if pendingUsers contains the current user
  return pendingUsers.includes(user);
}

/**
 * add current user to post's pendingUsers and update user's pendingRequests
 * @param {string} postID
 * @returns
 */
export async function requestToJoinGroup(postID) {
  // given a user and a post, try to join the post's "pendingUsers" and update user's "pendingRequests"
  if (currentUserEmail() == null) {
    console.log("requestToJoinGroup: not signed in");
    // return false;
  }
  console.log("1");
  console.log("2");
  const userRef = doc(db, "/Users/" + currentUserEmail());

  // add user to post's pendingUsers
  const postRef = doc(db, "/Posts/" + postID);

  console.log("3");
  updateDoc(postRef, {
    pendingUsers: arrayUnion(currentUserEmail()),
  });

  // add post to user's pendingRequests
  updateDoc(userRef, {
    pendingRequests: arrayUnion(postID),
  });
  console.log("4");
  // return true;
}

/**
 * remove current user from a post's users
 * this removes both approved and pending users
 * @param {string} postID
 */
export async function leaveGroup(postID) {
  const postRef = doc(db, "/Posts/" + postID);
  const postSnap = await getDoc(postRef);
  if (!postSnap.exists() || currentUserEmail() == null) {
    console.log("leaveGroup: invalid post or not signed in");
    return;
  }

  const userRef = doc(db, "/Users/" + currentUserEmail());

  // remove user from post's pendingUsers
  updateDoc(postRef, {
    pendingUsers: arrayRemove(currentUserEmail()),
    approvedUsers: arrayRemove(currentUserEmail()),
  });
  // remove post from user's pendingRequests
  updateDoc(userRef, {
    pendingRequests: arrayRemove(postID),
    approvedRequests: arrayRemove(postID),
  });
}

/**
 * If current user is post owner, approve/deny userID's request
 * answer: T/F -> approve/deny
 * @param {string} postID
 * @param {string} userID
 * @param {boolean} approveOrDeny
 */
export async function approveOrDenyRequestToJoinGroup(
  postID,
  userID,
  approveOrDeny
) {
  // make sure current user is post owner
  if (!isCurrentUserPostOwner(postID)) {
    console.log(
      "approveOrDenyRequestToJoinGroup: Current user is not post owner (or some edge case came up)"
    );
    return;
  }

  // make sure user is on pending list
  // get the post's data
  const postRef = doc(db, "/Posts/" + postID);
  const postSnap = await getDoc(postRef);
  if (!postSnap.exists()) {
    console.log("approveOrDenyRequestToJoinGroup: invalid post");
    return;
  }
  const pendingUsers = postSnap.data().pendingUsers;

  // see if pendingUsers contains the current user
  if (pendingUsers.includes(userID)) {
    const userRef = doc(db, "/Users/" + userID);
    // remove user from post's pendingUsers
    updateDoc(postRef, {
      pendingUsers: arrayRemove(userID),
    });
    console.log("!!!");
    // remove post from user's pendingRequests
    updateDoc(userRef, {
      pendingRequests: arrayRemove(postID),
    });
    if (approveOrDeny) {
      console.log("AHH");
      // add user to post's approvedUsers
      updateDoc(postRef, {
        approvedUsers: arrayUnion(userID),
      });
      // add post to user's pendingRequests
      updateDoc(userRef, {
        approvedRequests: arrayUnion(postID),
      });
    }
  }
}

//
//
//
//

/**
 * Returns the current user's name
 * if the data doesn't exist, returns "No User Data"
 * @returns {string}
 */
export async function getCurrentUserName() {
  const userData = await getUser(currentUserEmail());
  return userData ? userData.name : "No User Data";
}

/**
 * Returns the current user's discord tag
 * if the data doesn't exist, returns "No User Data"
 * @returns {string}
 */
export async function getCurrentUserDiscord() {
  const userData = await getUser(currentUserEmail());
  return userData ? userData.discordTag : "No User Data";
}

/** CHANGES
 * Returns the current user's description tag
 * if the data doesn't exist, returns "No User Data"
 * @returns {string}
 */
export async function getCurrentUserDescription() {
  const userData = await getUser(currentUserEmail());
  return userData ? userData.description : "No User Data";
}

/**
 * Returns array of the user's active post's IDs, or an empty array if something unexpected happens
 * @returns {Array<string>}
 */
export async function getCurrentUserActivePostings() {
  const userData = await getUser(currentUserEmail());
  return userData ? userData.activePostings : null;
}

/**
 * Returns array of the user's inactive post's IDs, or an empty array if something unexpected happens
 * @returns {Array<string>}
 */
export async function getCurrentUserInactivePostings() {
  const userData = await getUser(currentUserEmail());
  return userData ? userData.inactivePostings : [];
}

/**
 * Returns array of the user's approved requests post's IDs, or an empty array if something unexpected happens
 * @returns {Array<string>}
 */
export async function getCurrentUserApprovedRequests() {
  const userData = await getUser(currentUserEmail());
  return userData ? userData.approvedRequests : [];
}

/**
 * Returns array of the user's pending requests post's IDs, or an empty array if something unexpected happens
 * @returns {Array<string>}
 */
export async function getCurrentUserPendingRequests() {
  const userData = await getUser(currentUserEmail());
  return userData ? userData.pendingRequests : [];
}

/**
 * updates the current user's name
 * @param {string} name
 */
export async function updateCurrentUserName(name) {
  if (!name) {
    return;
  }

  const userRef = doc(db, "/Users/" + currentUserEmail());
  updateDoc(userRef, {
    name: name,
  });
}

/**
 * updates the current user's discord
 * @param {string} discord
 */
export async function updateCurrentUserDiscord(discord) {
  if (!discord) {
    return;
  }

  const userRef = doc(db, "/Users/" + currentUserEmail());
  updateDoc(userRef, {
    discordTag: discord,
  });
}

/**
 * updates the current user's description
 * @param {string} description
 */
export async function updateCurrentUserDescription(description) {
  if (!description) {
    return;
  }

  const userRef = doc(db, "/Users/" + currentUserEmail());
  updateDoc(userRef, {
    description: description,
  });
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
