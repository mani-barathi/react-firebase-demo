import { signInWithPopup } from "firebase/auth";
import React from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { auth, provider } from "../firebase";

function LoginPage() {
  function handleGoogleLogin() {
    signInWithPopup(auth, provider).catch((err) => {
      alert(err);
    });
  }

  return (
    <div>
      <button style={{ margin: "1rem" }} onClick={handleGoogleLogin}>
        Sign in with Google
      </button>

      <LoginForm />

      <SignUpForm />
    </div>
  );
}

export default LoginPage;
