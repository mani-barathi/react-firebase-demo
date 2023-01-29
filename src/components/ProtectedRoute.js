import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const [user] = useAuth();
  const location = useLocation();
  // console.log("pathname", location.pathname);

  if (!user) {
    return <Navigate to={"/login"} state={{ path: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
