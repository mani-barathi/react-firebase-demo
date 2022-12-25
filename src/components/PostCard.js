import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} key={post.id} className="postcard-link">
      <div className="postcard">
        <h3> {post.title}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            width={32}
            height={32}
            style={{ marginRight: "8px", borderRadius: "50%" }}
            alt=""
          />
          <h5>{post.author}</h5>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
