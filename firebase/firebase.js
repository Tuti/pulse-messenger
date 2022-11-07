// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  browserSessionPersistence,
  connectAuthEmulator,
  getAuth,
  initializeAuth,
  setPersistence,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEF2obTE6AWyYS6w-VG2aipXR-u4-x1Vo",
  authDomain: "pulse-messenger-37eb5.firebaseapp.com",
  projectId: "pulse-messenger-37eb5",
  storageBucket: "pulse-messenger-37eb5.appspot.com",
  messagingSenderId: "635949255573",
  appId: "1:635949255573:web:797fd9ea317d7dda09449c",
  measurementId: "G-0P9KXEC0YW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//Initialize auth
export const auth = getAuth(app);
// connectAuthEmulator(auth, 'http://localhost:9099');
setPersistence(auth, browserSessionPersistence);
