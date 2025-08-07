// file Imports


// dependency Imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4-OsD1vkBd5E0wWyHywBMw-tj-8wiPzs",
  authDomain: "auth-b8c2b.firebaseapp.com",
  projectId: "auth-b8c2b",
  storageBucket: "auth-b8c2b.firebasestorage.app",
  messagingSenderId: "655217647306",
  appId: "1:655217647306:web:3092de466196ee42f99e33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// exports
export const auth = getAuth(app);

export const fireDB = getFirestore(app);