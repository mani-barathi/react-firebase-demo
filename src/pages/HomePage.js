import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function HomePage({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    // adding conditions
    // const q = query(collectionRef, where("author", "==", "mani"));

    getDocs(q).then((snapshot) => {
      console.log(snapshot.docs[0].data());

      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        // return { id: doc.id, author: data.author, text: data.text, timestamp: data.timestamp }
        return { id: doc.id, ...data };
      });

      console.log(docs);
      setPosts(docs);
    });
    //  getDocs(query(collection(db, 'posts')))
  }, []);

  return (
    <div className="app">
      <h1>HomePage</h1>

      {user && <h2>{user.displayName}</h2>}
      {user && <h2>{user.email}</h2>}

      {posts.map((post) => (
        <div key={post.id}>
          <h3> {post.author}</h3>
          <p> {post.text} </p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
