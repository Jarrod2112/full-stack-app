import React, { useEffect, useRef, useState } from "react";
import postResources from "../../resources/post";

export const CommentMenu = (props) => {
  const [isHidden, setIsHidden] = useState(true);
  const [newText, setNewText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const toggleHidden = () => setIsHidden(!isHidden);

  const ref = useRef();

  async function handleDeleteClick() {
    await postResources.deleteComment(props.commentId, props.postId);
    props.onCommentDelete();
    toggleHidden();
  }

  async function handleEditClick() {
    await postResources.editComment(newText, props.postId, props.commentId);
    props.onCommentEdit();
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
        <div
          onClick={handleDeleteClick}
          key={props.commentId}
          type="button"
          role="button"
          className="dropdown-item"
        >
          Delete
        </div>
        <div>
          {isEditing ? (
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          ) : (
            <p>{newText}</p>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-outline-secondary dropdown-toggle"
          >
            {isEditing ? (
              <span
                onClick={() => handleEditClick()}
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                role="button"
                value={newText}
              >
                Save
              </span>
            ) : (
              "Edit"
            )}
          </button>
        </div>
      </ul>
    </div>
  );
};
