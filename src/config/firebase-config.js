// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpp7FDIrUrkMkyjpARBsbfNscpk_8WWLI",
  authDomain: "ecommerce-b15cb.firebaseapp.com",
  projectId: "ecommerce-b15cb",
  storageBucket: "ecommerce-b15cb.appspot.com",
  messagingSenderId: "5526920512",
  appId: "1:5526920512:web:f3b1b61e2f2a430f552ea5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);