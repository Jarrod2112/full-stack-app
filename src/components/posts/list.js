import React, { useEffect, useState } from "react";
import postResources from "../../resources/post";
import moment from "moment";
import { Create } from "./create";
import { Comment } from "./comment";
import "../../App.css";

export const List = () => {
  const [posts, setPosts] = useState([]);
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => setIsHidden(!isHidden);

  function loadPosts() {
    postResources.allPosts().then((response) => {
      setPosts(response);
    });
  }

  async function handleDeleteClick(postId) {
    await postResources.deletePost(postId);
    loadPosts();
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <div>
        <Create onPostCreate={loadPosts} />
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col">
              {posts.map((post) => (
                <div
                  className="card bg-dark text-white card w-100 mb-1"
                  key={post._id}
                >
                  <div />
                  <div className="d-md-flex d-grid gap-2 d-md-flex mb-1 justify-content-md-end">
                    <button
                      onClick={toggleHidden}
                      className="btn btn-success me-md-1 btn-sm"
                    >
                      ...
                    </button>
                    <ul className={isHidden ? "hide" : ""}>
                      <button
                        onClick={() => handleDeleteClick(post._id)}
                        type="button"
                        className="btn btn-primary me-md-1 btn-sm "
                      >
                        Delete
                      </button>
                    </ul>
                  </div>
                  <i className="card-text">{post.post}</i>
                  <em>{moment(post.timestamp).format("M/DD/YYYY HH:mm")}</em>
                  <hr></hr>
                  <ins>
                    <em>Comments</em>
                  </ins>
                  <br></br>
                  {/* Use the && operator to conditionally render something */}
                  {post.comments &&
                    post.comments.map((comment) => (
                      <small key={comment.comment}>{comment.comment}</small>
                    ))}
                  <br></br>
                  <Comment post={post} onCommentCreate={loadPosts} />
                </div>
              ))}
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </>
  );
};
