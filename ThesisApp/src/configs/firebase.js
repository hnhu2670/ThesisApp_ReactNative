import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
const firebaseConfig = {
  apiKey: "AIzaSyACtY07XEROWCoUpgJIcLIIjfUZgbfjBdY",
  authDomain: "chat-4be3a.firebaseapp.com",
  projectId: "chat-4be3a",
  storageBucket: "chat-4be3a.appspot.com",
  messagingSenderId: "874551580778",
  appId: "1:874551580778:web:2d8d836c08a2dc80bd1213",
  measurementId: "G-QHBQ0YS6Q3"
};
// initialize firebase
initializeApp(firebaseConfig);
export const database = getFirestore();
