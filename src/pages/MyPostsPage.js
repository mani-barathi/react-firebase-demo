import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { db } from "../firebase";

function DraftPostPage({ user }) {
  const [posts, setPosts] = useState([]);
  const [isPublishedPosts, setIsPublishedPosts] = useState(true);

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
  }, [user.uid]);

  const renderPosts = () => {
    const data = posts.map((post) => {
      if (post.published === isPublishedPosts) {
        return <PostCard post={post} />;
      }
      return null;
    });

    return data;
  };

  return (
    <div className="app">
      <div>
        <h1>My Posts</h1>
        <h3>Welcome {user.displayName}!</h3>
      </div>
      <div>
        <button
          className={isPublishedPosts ? "btn-primary" : "btn-secondary"}
          onClick={() => setIsPublishedPosts(true)}
        >
          Published Posts
        </button>{" "}
        <button
          className={!isPublishedPosts ? "btn-primary" : "btn-secondary"}
          onClick={() => setIsPublishedPosts(false)}
        >
          Draft Posts
        </button>
      </div>
      <div>{renderPosts()}</div>
    </div>
  );
}

export default DraftPostPage;
