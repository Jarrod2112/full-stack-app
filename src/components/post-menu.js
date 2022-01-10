import React, { useEffect, useRef, useState } from "react";
import postResources from "../resources/post";

export const PostMenu = (props) => {
  const [isHidden, setIsHidden] = useState(true);
  const [newText, setNewText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const toggleHidden = () => setIsHidden(!isHidden);

  const ref = useRef();

  async function handleDeleteClick() {
    await postResources.deletePost(props.postId);
    props.onPostDelete();
    toggleHidden();
  }

  async function handleEditClick() {
    await postResources.editPost(newText, props.postId);
    props.onEdit();
    toggleHidden();
  }

  useEffect(() => {
    const outsideClickCheck = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsHidden(true);
      }
    };

    document.addEventListener("mousedown", outsideClickCheck);

    return () => {
      document.removeEventListener("mousedown", outsideClickCheck);
    };
  }, [isHidden]);

  return (
    <div>
      <button
        onClick={toggleHidden}
        className="btn btn-outline-secondary dropdown-toggle"
      ></button>
      <ul className={(isHidden ? "" : "show ") + "dropdown-menu"} ref={ref}>
        <li
          onClick={handleDeleteClick}
          key={props.postId}
          type="button"
          className="dropdown-item"
        >
          Delete
        </li>
        <li
          className="dropdown-item"
          onClick={() => (isEditing ? () => {} : setIsEditing(true))}
        >
          {isEditing ? (
            <>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="form-control"
              />
              <button
                onClick={handleEditClick}
                className="btn btn-outline-secondary"
                value={newText}
              >
                Save
              </button>
            </>
          ) : (
            "Edit"
          )}
        </li>
      </ul>
    </div>
  );
};
