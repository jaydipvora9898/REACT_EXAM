import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { loginAsync } from "../Services/Actions/authActions";
import './common.css'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(loginAsync(userCredential.user));
      alert("Account created successfully!");
      navigate("/signin");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="auth-page">
    <div className="auth-card p-4">
      <h3 className="text-center mb-3 auth-title text-white">Create Account 🚀</h3>
  
      {errorMsg && (
        <div className="alert alert-danger py-2" role="alert">
          {errorMsg}
        </div>
      )}
  
      <form onSubmit={handleRegister}>
        <input
          className="auth-input my-2 w-100"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth-input my-2 w-100"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="auth-input my-2 w-100"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="auth-btn mt-3" type="submit">Sign Up</button>
      </form>
  
      <p className="text-center mt-3">
        Already have an account?{" "}
        <Link to="/signin" className="text-decoration-none fw-semibold text-primary">
          Sign In
        </Link>
      </p>
    </div>
  </div>
  
  );
};

export default SignUp;
