import { serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useAuth } from "../context/AuthContext";
import { storage } from "../firebase";

const categoryOptions = [
  "Fashion",
  "Coding",
  "Tech",
  "Travel",
  "Food",
  "Lifestyle",
];

function BlogPostForm({ onSubmitFn, post }) {
  const [user] = useAuth();
  const [text, setText] = useState(post ? post.text : "");
  const [category, setCategory] = useState(post ? post.category : "");
  const [title, setTitle] = useState(post ? post.title : "");
  const [published, setPublished] = useState(post ? post.published : false);
  const [coverImage, setCoverImage] = useState();
  const [preview, setPreview] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleTextChange = (e) => {
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
      // coverImageUrl: ulr
    };

    if (!category) {
      doc.category = "Unknown";
    }

    // upload image
    // get image url
    // add image url in document then uplaod to firestore

    if (!post && coverImage) {
      const imageRef = ref(storage, `cover-images/${coverImage.name}`);
      const uploadTask = uploadBytesResumable(imageRef, coverImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + uploadProgress + "% done");
          setProgress(uploadProgress);
        }, // progress function
        (error) => {
          alert("Error while uploading image", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            doc.coverImageURL = downloadURL;
            doc.coverImageName = coverImage.name;
            onSubmitFn(doc);
          });
        }
      );
    } else {
      onSubmitFn(doc);
    }
  }

  function handleImageUpload(e) {
    const [file] = e.target.files;
    console.log(file);
    if (file) {
      if (file.type.startsWith("image/")) {
        return setCoverImage(file);
      } else {
        alert("File type should be image");
      }
    }
    setCoverImage(null);
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

      {post ? ( // edit
        <div>
          {post.coverImageURL && (
            <img src={post.coverImageURL} width={100} height={60} />
          )}
          {/* <button type="button">Delete</button> */}
        </div>
      ) : (
        // create
        <div>
          <label for="image">Cover Image</label>
          <input type="file" onChange={handleImageUpload} />
          <progress value={progress} max="100">
            {`${progress}%`}
          </progress>
        </div>
      )}

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label className="label">Text</label>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setPreview(!preview)}
          >
            {preview ? "Edit" : "Preview"}
          </button>
        </div>
        {preview ? (
          <ReactMarkdown className="markdown">{text}</ReactMarkdown>
        ) : (
          <textarea
            className="textarea"
            value={text}
            onChange={handleTextChange}
            placeholder="write something..."
            required
          ></textarea>
        )}
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
