// src/lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9bTUaqs_TF0iG0iu9t5ZAdRGUMS_t0bY",
  authDomain: "tradair-b2b8e.firebaseapp.com",
  projectId: "tradair-b2b8e",
  storageBucket: "tradair-b2b8e.firebasestorage.app",
  messagingSenderId: "190146660959",
  appId: "1:190146660959:web:5745b6d46970221725a9ea",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
