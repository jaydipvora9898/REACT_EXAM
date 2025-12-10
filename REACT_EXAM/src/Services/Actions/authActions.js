import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../../../firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

export const loginAsync = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const safeUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    };

    dispatch({ type: "LOGIN", payload: safeUser });
  } catch (error) {
    dispatch({ type: "AUTH_ERROR", payload: error.message });
  }
};

export const registerAsync = (email, password) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.email.split("@")[0],
      photoURL: "",
      role: "user", // 👈 default role
    };

    // ✅ Save user to Firestore
    await setDoc(doc(db, "users", user.uid), userData);

    dispatch({ type: "REGISTER_SUCCESS", payload: userData });
  } catch (error) {
    dispatch({ type: "AUTH_ERROR", payload: error.message });
  }
};
export const loginWithGoogle = () => async (dispatch) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split("@")[0],
        photoURL: user.photoURL || "",
        role: "user"
      };

      await setDoc(userRef, userData);
      console.log("✅ New Google user saved to Firestore");
    }

    const finalSnap = await getDoc(userRef);
    const userData = finalSnap.data();

    dispatch({ type: "LOGIN", payload: userData });

  } catch (error) {
    console.error("❌ Google login error:", error);
    dispatch({ type: "AUTH_ERROR", payload: error.message });
  }
};

export const logoutAsync = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("user");
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "AUTH_ERROR", payload: error.message });
  }
};
