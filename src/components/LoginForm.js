import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    // signInWithEmailAndPassword(auth, email, password).catch((err) => {
    //   alert(err.message);
    // });

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <form onSubmit={handleLogin} style={{ padding: "1rem" }}>
      <h2> Login</h2>

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

      <button type="submit">Login</button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;
