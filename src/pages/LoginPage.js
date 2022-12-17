import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { auth, provider } from "../firebase";

function LoginPage({ setUser, user }) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location state", location.state);

  function handleGoogleLogin() {
    signInWithPopup(auth, provider).catch((err) => {
      alert(err);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // user is logged in
        setUser(authUser);
        if (location.state?.path) {
          navigate(location.state.path);
        } else {
          navigate("/");
        }
      } else {
        // user is not logged in
        setUser(null);
        // navigate("/login");
      }
    });
  }, [navigate, setUser]);

  return (
    <div className="app">
      <div className="login-wrapper">
        <LoginForm />
        <SignUpForm />

        <button className="btn-primary w-100" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
