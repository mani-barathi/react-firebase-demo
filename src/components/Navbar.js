import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import Modal from "./Modal";

function Navbar() {
  const [user, setUser] = useAuth();
  const [logoutModal, setLogoutModal] = useState(false);

  function handleLogout() {
    signOut(auth).then(() => {
      setUser(null);
      setLogoutModal(false);
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
            <button className="nav-btn" onClick={() => setLogoutModal(true)}>
              Logout
            </button>
          </>
        )}

        <Modal
          title="Logout"
          isOpen={logoutModal}
          onClose={() => setLogoutModal(false)}
        >
          <p>Are you sure, that you want to logout</p>
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default Navbar;
