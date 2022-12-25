import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";

function PostContentPage({ user }) {
  const params = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "posts", params.postId);
    getDoc(docRef)
      .then((snapshot) => {
        console.log("document", snapshot.data());
        if (snapshot.exists()) {
          setPost({
            id: snapshot.id,
            ...snapshot.data(),
          });
        } else {
          setError("Resource not Found. Post doesn't exists");
        }
      })
      .catch(() => setError("Someting went wrong."))
      .finally(() => setLoading(false));
  }, [params.postId]);

  console.log(params);

  if (loading) return <h1 style={{ textAlign: "center" }}>Loading...</h1>;

  if (error) return <h1 style={{ textAlign: "center" }}>{error}</h1>;

  return (
    <div className="app">
      {post.authorId === user.uid && (
        <div>
          <Link to={`/edit/${post.id}`} className="btn-primary">
            Edit
          </Link>
        </div>
      )}
      <h1>{post.title}</h1>
      <h3>{post.author}</h3>
      <ReactMarkdown>{post.text}</ReactMarkdown>
    </div>
  );
}

export default PostContentPage;
