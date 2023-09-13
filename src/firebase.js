import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "aqua-surveillance-7c41e.firebaseapp.com",
  databaseURL: "https://aqua-surveillance-7c41e-default-rtdb.firebaseio.com",
  projectId: "aqua-surveillance-7c41e",
  storageBucket: "aqua-surveillance-7c41e.appspot.com",
  messagingSenderId: "199373874563",
  appId: "1:199373874563:web:47926d6a38329f066102b6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const dbR = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
