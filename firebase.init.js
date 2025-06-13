// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE5wggI4emLurfUtIDAyrsUeMwG5kv0xk",
  authDomain: "learnxyz-73605.firebaseapp.com",
  projectId: "learnxyz-73605",
  storageBucket: "learnxyz-73605.firebasestorage.app",
  messagingSenderId: "901015777334",
  appId: "1:901015777334:web:d3234941e0095b17142897"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
