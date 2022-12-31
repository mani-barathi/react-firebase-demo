import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";

import CreateBlogPostPage from "./pages/CreateBlogPostPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import EditBlogPostPage from "./pages/EditBlogPostPage";
import MyPostsPage from "./pages/MyPostsPage";
import PostContentPage from "./pages/PostContentPage";


function App() {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={[user, setUser]}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* <ProtectedRoute user={user}>
          <Route path="/" element={<HomePage user={user} />} />
        </ProtectedRoute> */}
        <Route
          path="/myposts"
          element={
            <ProtectedRoute user={user}>
              <MyPostsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:postId"
          element={
            <ProtectedRoute user={user}>
              <EditBlogPostPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post/:postId"
          element={
            <ProtectedRoute user={user}>
              <PostContentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute user={user}>
              <CreateBlogPostPage user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center", margin: "2rem" }}>
              Page not found(404)
            </h1>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
