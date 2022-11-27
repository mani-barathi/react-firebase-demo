import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";

import CreateBlogPostPage from "./pages/CreateBlogPostPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState();

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <HomePage user={user} />
            </ProtectedRoute>
          }
        />

        {/* <ProtectedRoute user={user}>
          <Route path="/" element={<HomePage user={user} />} />
        </ProtectedRoute> */}

        <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute user={user}>
              <CreateBlogPostPage user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
