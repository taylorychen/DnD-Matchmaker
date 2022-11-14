import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./config";
import { createUser } from "./helpers";

const provider = new GoogleAuthProvider();

export function currentUser() {
    // returns a User object if sign in, null if not signed in
    return auth.currentUser;
    // list of useful things you can do with a User object: get the email, end of list
}

export function currentUserEmail() {
    // returns the current user's email if signed in
    // otherwise returns null
    return auth.currentUser ? auth.currentUser.email : null;
    // list of useful things you can do with a user's email: get all of the user's data with getUser(), etc.
}

export async function login() {
    // creates a pop up to sign in with Google
    signInWithPopup(auth, provider)
        .then((result) => {
            // adds the newly signed in user to the user database
            const user = result.user;
            const fullname = user.displayName;
            createUser(user.email, fullname);
        })
        .catch((error) => {
            console.log("Error " + error.code + " " + error.message);
        });
}

export async function logout() {
    // logs out the current user
    signOut(auth).catch((error) => {
        console.log("Error " + error.code + " " + error.message);
    });
}
