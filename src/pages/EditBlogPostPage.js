import React from "react";
import { useNavigate } from "react-router-dom";

function EditBlogPostPage({ user }) {
  const navigate = useNavigate();

  async function updatePost(doc) {
    try {
      // update post here
    } catch (e) {
      console.log("doc failed: ", e);
    }
  }

  return (
    <div className="app">
      <h1>Edit Post</h1>
      {/* <BlogPostForm post={post} onSubmitFn={updatePost} user={user} /> */}
    </div>
  );
}

export default EditBlogPostPage;
