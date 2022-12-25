import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";

const categoryOptions = [
  "Fashion",
  "Coding",
  "Tech",
  "Travel",
  "Food",
  "Lifestyle",
];

function BlogPostForm({ onSubmitFn, user, post }) {
  const [text, setText] = useState(post ? post.text : "");
  const [category, setCategory] = useState(post ? post.category : "");
  const [title, setTitle] = useState(post ? post.title : "");
  const [published, setPublished] = useState(post ? post.published : false);

  const handleTextChange = (e) => {
    console.log("type");
    console.log(e.target.value);
    setText(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const doc = {
      author: user.displayName,
      authorId: user.uid,
      text: text,
      timestamp: serverTimestamp(),
      category,
      title,
      published,
    };

    if (!category) {
      doc.category = "Unknown";
    }

    onSubmitFn(doc);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="label">Title</label>
        <input
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          required
        />
      </div>

      <div>
        <label className="label">Category</label>
        <select
          className="select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option defaultChecked value={""}>
            Select a Category
          </option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Text</label>
        <textarea
          className="textarea"
          value={text}
          onChange={handleTextChange}
          placeholder="write something..."
          required
        ></textarea>
      </div>

      <div className="form-check-group">
        <input
          checked={published}
          id="publish"
          type="checkbox"
          className="form-check"
          onChange={(e) => setPublished(e.target.checked)}
        />
        <label htmlFor="publish">Publish</label>
      </div>

      <button className="btn-primary" type="submit">
        {published ? "Publish" : "Save"}
      </button>
    </form>
  );
}

export default BlogPostForm;
