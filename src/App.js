import "./styles/App.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateBlogPostPage from "./pages/CreateBlogPostPage";

import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("route is changed", navigate);
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
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        />
        <Route path="/create" element={<CreateBlogPostPage />} />
      </Routes>
    </div>
  );
}

export default App;
