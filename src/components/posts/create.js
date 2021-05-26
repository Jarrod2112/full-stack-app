import React, { useState } from "react";
export function Create() {
  const [post, setPost] = useState("");
  return (
    <div>
      <h1>Create new post</h1>
      <input
        placeholder="post"
        onChange={(e) => setPost(e.target.value)}
      />
    </div>
  );
}
