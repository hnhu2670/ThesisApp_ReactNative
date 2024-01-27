import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAFGlpl0GE0jM-ntCu17nzzhz4VBDT-N0c",
  authDomain: "project-c6fe0.firebaseapp.com",
  projectId: "project-c6fe0",
  storageBucket: "project-c6fe0.appspot.com",
  messagingSenderId: "765771299926",
  appId: "1:765771299926:web:e895fff1f4c4fd4f1d4ff7",
  measurementId: "G-4EKHMF024B"
};
// initialize firebase
initializeApp(firebaseConfig);
export const database = getFirestore();
