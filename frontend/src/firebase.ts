// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyABr58gV1UPTZWHcabWFasnnUJLhgv9x9Q",
    authDomain: "life-app-prod.firebaseapp.com",
    projectId: "life-app-prod",
    storageBucket: "life-app-prod.firebasestorage.app",
    messagingSenderId: "352812946544",
    appId: "1:352812946544:web:1582744b1fcf0d51cf50b5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
