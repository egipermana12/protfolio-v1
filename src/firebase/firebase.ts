// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA6OztM68M7Nj8zTr0tvwVcQROCfnMTQM",
  authDomain: "portfolio-d5eb4.firebaseapp.com",
  projectId: "portfolio-d5eb4",
  storageBucket: "portfolio-d5eb4.firebasestorage.app",
  messagingSenderId: "191594172545",
  appId: "1:191594172545:web:c77d83ea2c291370a23d80",
  measurementId: "G-KZ2Z1TS0ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db }