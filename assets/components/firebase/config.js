import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6cg15zDIKjbqbuYHj_RiYLXQSWYPZils",
  authDomain: "birds-i-view-b843d.firebaseapp.com",
  projectId: "birds-i-view-b843d",
  storageBucket: "birds-i-view-b843d.appspot.com",
  messagingSenderId: "119683020581",
  appId: "1:119683020581:web:bf618132f707b15b958ccc",
  databaseURL: "https://birds-i-view-b843d.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
