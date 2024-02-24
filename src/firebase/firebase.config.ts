/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apiKeyVal = import.meta.env.VITE_FIREBASE_API_KEY;
const firebaseConfig = {
    apiKey: apiKeyVal,
    authDomain: "my-menu-e75d1.firebaseapp.com",
    projectId: "my-menu-e75d1",
    storageBucket: "my-menu-e75d1.appspot.com",
    messagingSenderId: "87262156865",
    appId: "1:87262156865:web:35e5e10ce22c0725468ec0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app, 'https://my-menu-e75d1-default-rtdb.asia-southeast1.firebasedatabase.app/');
const auth = getAuth(app);


export { db, auth };