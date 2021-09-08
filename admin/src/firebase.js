import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// Create Configurations for Firebase
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "netflix-a8a8e.firebaseapp.com",
  projectId: "netflix-a8a8e",
  storageBucket: "netflix-a8a8e.appspot.com",
  messagingSenderId: "605942954092",
  appId: "1:605942954092:web:8f86d7a40f55bc40264049",
  measurementId: "G-1LGQMB6B4M",
};

const firebaseApp = initializeApp(firebaseConfig);
// const storage = firebase.storage();

const storage = getStorage();

export default storage;
