import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, {  useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  // const user = useContext(AuthContext);
  const [user] = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(
      collectionRef,
      orderBy("timestamp", "desc"),
      where("published", "==", true)
    );

    // adding conditions
    // const q = query(collectionRef, where("author", "==", "mani"));

    getDocs(q).then((snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        // return { id: doc.id, author: data.author, text: data.text, timestamp: data.timestamp }
        return { id: doc.id, ...data };
      });

      console.log(docs);
      setPosts(docs);
      setLoading(false);
    });
    //  getDocs(query(collection(db, 'posts')))
  }, []);

  return (
    <div className="app">
      <h1>HomePage</h1>
      <h3>Welcome {user.displayName}!</h3>

      {loading ? (
        <h1 className="text-center" style={{ margin: '5rem 0' }}>Loading...</h1>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
