import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSignUp(e) {
    e.preventDefault();
    console.log(name, email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        // console.log(authUser.user);

        updateProfile(authUser.user, {
          displayName: name,
          photoURL: `https://ui-avatars.com/api/?name=${name}`,
        });
      })
      .catch((e) => {
        // alert(e.message);
        setError(e.message);
      });
  }

  return (
    <form className="form" onSubmit={handleSignUp}>
      <h2> Sign Up</h2>
      <div>
        <label className="label">Name</label>
        <input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Name"
          type="text"
          required
        />
      </div>
      <div>
        <label className="label">Email</label>
        <input
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          required
        />
      </div>
      <div>
        <label className="label">Password</label>
        <input
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          type="password"
          required
        />
      </div>

      <button className="btn-primary w-100" type="submit">
        Sign Up
      </button>
      {error && <div className="error-card">{error}</div>}
    </form>
  );
}

export default LoginForm;
