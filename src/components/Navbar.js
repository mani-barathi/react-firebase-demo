import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";

function Navbar() {
  const [user, setUser] = useAuth();

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
            <Link to={"/myposts"} className="nav-link">
              MyPosts
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
