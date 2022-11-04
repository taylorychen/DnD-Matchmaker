import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrUA-M4l5npmu3CyJb4_0TzWHcTGiPNTU",
  authDomain: "cs35lproject.firebaseapp.com",
  databaseURL: "https://cs35lproject-default-rtdb.firebaseio.com",
  projectId: "cs35lproject",
  storageBucket: "cs35lproject.appspot.com",
  messagingSenderId: "612627049647",
  appId: "1:612627049647:web:59162a44200920e834785a",
  measurementId: "G-NSWQ77ZEB1",
};

// Initialize Firebase and Firestore
export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
