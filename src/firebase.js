// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, /* connectFirestoreEmulator */} from "firebase/firestore";
import { useRouter } from "vue-router";

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

let uid = "";
let userName = "";
//"oQJOE3DLYUiW9x2WxEeY"  online database
// const uid = "cZVrnFwfT8iWLngs2nss" // local database
function setBasicUID() {
  uid = "oQJOE3DLYUiW9x2WxEeY";
  userName = "Bhav"
}
function setCommUID() {
  uid = "cZVrnFwfT8iWLngs2nss";
  userName = "Carlos"
}

function goToUsers() {
  if (!uid) {
    useRouter().push("/chooseUser");
  }
}
// // console.log(uid)

export { db, uid, userName, setBasicUID, setCommUID, goToUsers }