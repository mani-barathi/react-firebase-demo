import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { db } from "../firebase";

function DraftPostPage({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(
      collectionRef,
      orderBy("timestamp", "desc"),
      // where("published", "==", false),
      where("authorId", "==", user.uid)
    );

    getDocs(q).then((snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });

      setPosts(docs);
    });
  }, []);

  return (
    <div className="app">
      <h1>My Posts</h1>
      <h3>Welcome {user.displayName}!</h3>

      <div>
        {posts.map((post) => (
          <div key={post.id} className="postcard">
            <h3> {post.author}</h3>
            {/* <p> {post.text} </p> */}
            <ReactMarkdown>{post.text}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DraftPostPage;
