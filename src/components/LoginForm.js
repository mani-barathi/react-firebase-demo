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
      console.log(e.message);
      setError(e.message);
    }
  }

  return (
    <form className="form" onSubmit={handleLogin}>
      <h2> Login</h2>

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
        Login
      </button>

      {error && <div className="error-card">{error}</div>}
    </form>
  );
}

export default LoginForm;
