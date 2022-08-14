import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_TmRRtEnW87IojEfB_BGo27kn1EKj1sU",
  authDomain: "react-firebase-demo-e1af2.firebaseapp.com",
  projectId: "react-firebase-demo-e1af2",
  storageBucket: "react-firebase-demo-e1af2.appspot.com",
  messagingSenderId: "54238123294",
  appId: "1:54238123294:web:ac09eae9396304a97c250f",
  measurementId: "G-7MLNDZTPM8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
