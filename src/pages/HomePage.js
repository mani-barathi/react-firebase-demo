import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import ReactMarkdown from "react-markdown";

function HomePage({ user }) {
  const [posts, setPosts] = useState([]);

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
    });
    //  getDocs(query(collection(db, 'posts')))
  }, []);

  return (
    <div className="app">
      <h1>HomePage</h1>
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

export default HomePage;
