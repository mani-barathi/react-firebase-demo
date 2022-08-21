import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function Navbar({ user, setUser }) {
  function handleLogout() {
    signOut(auth).then(() => {
      setUser(null);
    });
  }

  return (
    <div className="nav">
      {user && (
        // Fragment
        <>
          <Link to={"/"} className="nav-link">
            Home
          </Link>
          <Link to={"/create"} className="nav-link">
            Create
          </Link>
          <button onClick={handleLogout}> Logout</button>
        </>
      )}
    </div>
  );
}

export default Navbar;
