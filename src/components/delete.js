import React, { useState } from "react";
import postResources from "../resources/post"

export const DeleteBtn = (props) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => setIsHidden(!isHidden);

  async function handleDeleteClick() {
    await postResources.deletePost(props.postId);
    props.onPostDelete()
  }

  return (
  <div>
    <button
      onClick={toggleHidden}
      className="btn btn-outline-secondary dropdown-toggle"
    ></button>
    <ul
      className={
        (isHidden ? "" : "show ") + "dropdown-menu"
      }
    >
      <a
        onClick={handleDeleteClick}
        key={props.postId}
        type="button"
        role="button"
        className="dropdown-item"
      >
        Delete
      </a>
    </ul>
  </div>
  );
}