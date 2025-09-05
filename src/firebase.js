import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBACjjZ1ascSnqOwtrOmXKEDAd0vXpmQD4",
  authDomain: "interview-debrief-forum.firebaseapp.com",
  projectId: "interview-debrief-forum",
  storageBucket: "interview-debrief-forum.firebasestorage.app",
  messagingSenderId: "71887312378",
  appId: "1:71887312378:web:a72c3da29443b292258043",
  measurementId: "G-SHJGMXNF45"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
