import React, { useEffect, useRef, useState } from "react";
import postResources from "../resources/post";

export const PostMenu = (props) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => setIsHidden(!isHidden);

  const ref = useRef();

  async function handleDeleteClick() {
    await postResources.deletePost(props.postId);
    props.onPostDelete();
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
};
