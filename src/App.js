import "./styles/App.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // user is logged in
        setUser(authUser);
        navigate("/");
      } else {
        // user is not logged in
        setUser(null);
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;
