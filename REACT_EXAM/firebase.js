// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2BkvYYnhguNBYGu05vIqLvnzJ6M2B5wU",
  authDomain: "react-exam-a88e2.firebaseapp.com",
  projectId: "react-exam-a88e2",
  storageBucket: "react-exam-a88e2.firebasestorage.app",
  messagingSenderId: "338416653152",
  appId: "1:338416653152:web:0bc298c47b9965530bc405",
  measurementId: "G-NCN68E5S4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

let analytics = null;
try {
  // Initialize only if analytics is supported in current environment
  isSupported().then((ok) => {
    if (ok) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
} catch (e) {
    console.log(e);
}

export { app, auth, googleProvider, db, analytics };
