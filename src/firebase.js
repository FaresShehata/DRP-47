// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7oW6d2x5czl-VdIqDnPoG2epEbrSDSUw",
  authDomain: "drp-vue.firebaseapp.com",
  projectId: "drp-vue",
  storageBucket: "drp-vue.appspot.com",
  messagingSenderId: "769443412052",
  appId: "1:769443412052:web:c2728dff0b759e8fe795c1"
};

// Initialize Firebase]
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// connectFirestoreEmulator(db, '127.0.0.1', 8080);

// const uid = "oQJOE3DLYUiW9x2WxEeY"
const uid = "cZVrnFwfT8iWLngs2nss"
console.log(uid)

export { db, uid }