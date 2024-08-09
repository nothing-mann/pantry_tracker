// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvDfbgt67K8y9XnpcmkglJTxIn2OJrswg",
  authDomain: "pantry-tracker-ef399.firebaseapp.com",
  projectId: "pantry-tracker-ef399",
  storageBucket: "pantry-tracker-ef399.appspot.com",
  messagingSenderId: "950022154617",
  appId: "1:950022154617:web:34d4ea1a0cf811b1f827a8",
  measurementId: "G-5QK4KY8EQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {firestore}