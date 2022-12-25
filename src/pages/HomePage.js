import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

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
            <h3> {post.title}</h3>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                width={32}
                height={32}
                style={{ marginRight: "8px" }}
                alt=""
              />
              <h5>{post.author}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
