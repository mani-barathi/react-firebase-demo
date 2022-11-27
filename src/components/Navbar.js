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
      <div className="nav-container">
        {user && (
          // Fragment
          <>
            <Link to={"/"} className="nav-link">
              Home
            </Link>
            <Link to={"/create"} className="nav-link">
              Create
            </Link>
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
