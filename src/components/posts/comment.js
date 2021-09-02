import React, { useState } from "react";
import postResources from "../../resources/post";

export const Comment = (props) => {
  const [comment, setComment] = useState("");
  const [newText, setNewText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  async function handleClick() {
    await postResources.createComment(comment, props.post._id);
    setComment("");
    props.onCommentCreate();
  }

  return (
    <div className="mx-2 mb-3">
      <textarea
        className="form-control mb-2"
        placeholder="Write a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleClick}
        type="button"
        className="btn btn-primary me-md-1 btn-sm "
      >
        Comment
      </button>
    </div>
  );
};
