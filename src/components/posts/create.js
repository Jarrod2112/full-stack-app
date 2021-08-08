import React, { useState } from "react";
import postResources from "../../resources/post";

export function Create(props) {
  const [post, setPost] = useState("");

  async function handleClick() {
    await postResources.createPost(post);
    setPost("");
    props.onPostCreate();
  }

  return (
    <div className="card bg-dark text-white mb-1">
      <div className="m-2">
        <textarea
          className="form-control"
          placeholder="Make a new post..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-primary btn-sm mt-2"
        >
          Post
        </button>
      </div>
    </div>
  );
}
