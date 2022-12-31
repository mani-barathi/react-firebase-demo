import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

function DraftPostPage() {
  // const user = useContext(AuthContext);
  const [user] = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false)
    });
  }, [user.uid]);

  const renderPosts = () => {
    // const data = posts.map((post) => {
    //   if (post.published === isPublishedPosts) {
    //     return <PostCard post={post} />;
    //   }
    //   return null;
    // });

    const result = posts.filter((post) => {
      if (post.published === isPublishedPosts) {
        return true
      }
      return false;
    })

    console.log('data', result)

    if(result.length === 0){
      return <h3 style={{textAlign:"center"}}>No posts Exists</h3>
    }

    return result.map((post) => <PostCard post={post} />)

  };

  return (
    <div className="app">
      <h1>My Posts</h1>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          className={isPublishedPosts ? "btn-primary" : "btn-secondary"}
          style={{ marginRight: "1rem" }}
          onClick={() => setIsPublishedPosts(true)}
        >
          Published Posts
        </button>
        <button
          className={!isPublishedPosts ? "btn-primary" : "btn-secondary"}
          onClick={() => setIsPublishedPosts(false)}
        >
          Draft Posts
        </button>
      </div>

      { loading ? (<h1 className="text-center">Loading...</h1>) :  <div>{renderPosts()}</div> }
    </div>
  );
}

export default DraftPostPage;
