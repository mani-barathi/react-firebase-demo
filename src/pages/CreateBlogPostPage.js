import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

function CreateBlogPostPage({ user }) {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    console.log("type");
    console.log(e.target.value);
    setText(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // add new doc to firestore
    const doc = {
      author: user.displayName,
      authorId: user.uid,
      text: text,
      timestamp: serverTimestamp(),
    };
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
      navigate("/");
    } catch (e) {
      console.log("doc failed: ", e);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Text: </label>
        <br />
        <textarea value={text} onChange={handleTextChange}></textarea>
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
}

export default CreateBlogPostPage;
