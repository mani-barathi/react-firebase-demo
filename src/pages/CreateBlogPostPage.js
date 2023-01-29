import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import BlogPostForm from "../components/BlogPostForm";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { db } from "../firebase";

function CreateBlogPostPage() {
  const [user] = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  async function createPost(doc) {
    // then version
    // addDoc(collection(db, "posts"), doc)
    //   .then((snapshot) => {
    //     console.log("doc inserted", snapshot.id);
    //     navigate("/");
    //   })
    //   .catch((e) => console.log("doc failed: ", e));

    // async await version
    try {
      const snapshot = await addDoc(collection(db, "posts"), doc);
      console.log("doc inserted: ", snapshot.id);
      addToast({
        title: `Post ${doc.published ? "Published" : "Saved"}`,
        type: "success",
      });
      navigate("/");
    } catch (e) {
      console.log("doc failed: ", e);
      addToast({
        title: `Error while Posting`,
        type: "error",
      });
    }
  }

  return (
    <div className="app">
      <BlogPostForm onSubmitFn={createPost} user={user} />
    </div>
  );
}

export default CreateBlogPostPage;
