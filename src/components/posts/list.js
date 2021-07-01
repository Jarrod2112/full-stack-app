import React, { useEffect, useState } from "react";
import postResources from "../../resources/post";
import moment from "moment";
import { Create } from "./create";
import { Comment } from "./comment";
import post from "../../resources/post";

export const List = () => {
  const [posts, setPosts] = useState([]);

  function loadPosts() {
    postResources.allPosts().then((response) => {
      setPosts(response);
    });
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
                  <i className="card-text">{post.post}</i>
                  <em>
                    {moment(post.timestamp).format("M/DD/YYYY HH:mm")}
                  </em>
                  <hr></hr>
                  <ins><em>Comments</em></ins>
                  <br></br>
                  {/* Use the && operator to conditionally render something */}
                  {post.comments &&
                    post.comments.map((comment) => <small>{comment.comment}</small>)}
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
