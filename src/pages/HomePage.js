import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

function HomePage({ user, setUser }) {
  function handleLogout() {
    signOut(auth).then(() => {
      setUser(null);
    });
  }

  return (
    <div className="app">
      <h1>HomePage</h1>
      <button onClick={handleLogout}> Logout</button>
      {user && <h2>{user.displayName}</h2>}
      {user && <h2>{user.email}</h2>}
    </div>
  );
}

export default HomePage;
