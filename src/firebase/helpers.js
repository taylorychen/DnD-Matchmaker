import { db } from '../firebase'
import { doc, setDoc, getDoc, updateDoc, Timestamp, arrayUnion } from "firebase/firestore";


async function getUser(email) {
  const user = await getDoc(doc(db, "/Users/" + email));
  if (user.exists()) {
    return user.data();
  } 
  return null;
}

async function createUser(email, fn, ln, dt) {
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

async function createPost(email, title, desc, tags, location, maxPlayers) {
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


