import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogPostForm from "../components/BlogPostForm";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

function EditBlogPostPage() {
  const [user] = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "posts", params.postId);
    getDoc(docRef)
      .then((snapshot) => {
        const data = snapshot.data();
        if (snapshot.exists()) {
          setPost({
            id: snapshot.id,
            ...snapshot.data(),
          });

          if (data.authorId !== user.uid) {
            setError("You don't have access to edit that Post");
          }
        } else {
          setError("Resource not Found. Post doesn't exists");
        }
      })
      .catch(() => setError("Someting went wrong."))
      .finally(() => setLoading(false));
  }, [params.postId, user.uid]);

  async function updatePost(updatedPost) {
    try {
      const docRef = doc(db, "posts", params.postId);
      await setDoc(docRef, updatedPost);
      navigate(`/post/${post.id}`);
    } catch (e) {
      console.log("doc failed: ", e);
    }
  }

  if (loading) {
    return (
      <div className="app">
        <h1 className="text-center mtb-5">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <h1 className="text-center mtb-5">{error}</h1>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Edit Post</h1>
      <BlogPostForm post={post} onSubmitFn={updatePost} />
    </div>
  );
}

export default EditBlogPostPage;
