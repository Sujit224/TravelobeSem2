// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgb63MO6cII808L_PPlnjeor_rfkyZ6ak",
  authDomain: "travelobe-998d2.firebaseapp.com",
  projectId: "travelobe-998d2",
  storageBucket: "travelobe-998d2.firebasestorage.app",
  messagingSenderId: "828958041497",
  appId: "1:828958041497:web:ac4aa43b7e3c7ba6235f08",
  measurementId: "G-TKKDCW8QDM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);