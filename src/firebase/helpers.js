import { db } from '../firebase'
import { doc, setDoc, getDoc, updateDoc, Timestamp, arrayUnion } from "firebase/firestore";


export async function getUser(email) {
  // given a user's (unique) email, return the User's data in the form of a DocumentData object
  const user = await getDoc(doc(db, "/Users/" + email));
  if (user.exists()) {
    return user.data();
  } 
  return null;
}

export async function createUser(email, fn, ln, dt) {
  // create a user given an email, first name, last name, and discord tag
  // if the email is already in use, return without creating
  // user's document ID is based on the email
  const userRef = doc(db, "/Users/" + email);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return;
  } 
  setDoc(userRef, {
    email: email,
    firstName: fn,
    lastName: ln,
    discordTag: dt,
    activePostings: [],
    archivedPostings: [],
    approvedRequests: [],
    pendingRequests: [],
  });
}

export async function createPost(email, title, desc, tags, location, maxPlayers) {
  // create a post given a user's email, and the post's params
  // if the user does not exist, return without creating
  // the post's document ID is based on the user who created it and the time of creation.
  // the function then adds this post to the list of the user's active posts 
  const userRef = doc(db, "/Users/" + email);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    return;
  } 

  const now = Timestamp.now();
  const postID = email + "__" +now.valueOf();
  setDoc(doc(db, "Posts", postID), {
    owner: email,
    title: title,
    description: desc,
    tags: tags,
    date: now,
    location: location,
    maxPlayers: maxPlayers,
    currPlayers: 0,
    isActive: true,
    approvedUsers: [],
    pendingUsers: [],
  }).then(() => {
    updateDoc(userRef, {
      activePostings: arrayUnion(postID),
    });
  });
 

}


