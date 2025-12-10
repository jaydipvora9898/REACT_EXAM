import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth, googleProvider } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { loginAsync } from "../Services/Actions/authActions";
import { FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import './common.css'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(loginAsync(email, password));
}, []);


  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
     dispatch(loginAsync(email, password)); 
      toast.success("SIGN IN SUCCESSFULLY ");
      setTimeout(() => {
       navigate("/");
      },3000)
    } catch (err) {
      toast.error(`SIGN IN FAILED ${err.message}`);
    }
  };

const handleGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split("@")[0],
        photoURL: user.photoURL || "",
        role: "user",
      });
    }

    const userData = (await getDoc(userRef)).data();
    dispatch({ type: "LOGIN", payload: userData });
    navigate("/");

  } catch (err) {
    console.error("❌ Google login error:", err.message);
  }
};

  return (
    <div className="auth-page">
      <ToastContainer autoClose={3000} theme="dark" />
      <div className="auth-card p-4">
        <h3 className="text-center mb-3 auth-title">Welcome Back 👋</h3>
        <form onSubmit={handleEmailLogin}>
          <input className="auth-input my-2 w-100 " type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="auth-input my-2 w-100" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="auth-btn mt-3 w-100" type="submit">Sign In</button>
        </form>
        <hr className="auth-divider my-3" />
        <button onClick={handleGoogle} className="auth-btn google-btn d-flex align-items-center justify-content-center gap-2">
          <FaGoogle /> Sign in with Google
        </button>
        <p className="text-center mt-3">
          Don’t have an account? <Link to="/signup" className="text-decoration-none">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
