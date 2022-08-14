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
    <form onSubmit={handleSignUp} style={{ padding: "1rem" }}>
      <h2> Sign Up</h2>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Name"
          type="text"
          required
        />
      </div>
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          required
        />
      </div>
      <div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          type="password"
          required
        />
      </div>

      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;
