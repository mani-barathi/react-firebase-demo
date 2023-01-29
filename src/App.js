import { Route, Routes } from "react-router-dom";
import "./styles/App.css";

import CreateBlogPostPage from "./pages/CreateBlogPostPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import EditBlogPostPage from "./pages/EditBlogPostPage";
import MyPostsPage from "./pages/MyPostsPage";
import PostContentPage from "./pages/PostContentPage";
import ToastProvider from "./context/ToastContext";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* <ProtectedRoute >
          <Route path="/" element={<HomePage user={user} />} />
        </ProtectedRoute> */}
          <Route
            path="/myposts"
            element={
              <ProtectedRoute>
                <MyPostsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:postId"
            element={
              <ProtectedRoute>
                <EditBlogPostPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post/:postId"
            element={
              <ProtectedRoute>
                <PostContentPage />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateBlogPostPage />
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
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
