import React, { useEffect, useState } from "react";
import postResources from "../../resources/post";
import moment from "moment";
import { Create } from "./create";
import { Comment } from "./comment";
import { DeleteBtn } from "../delete";
import "../../App.css";
import { PromiseProvider } from "mongoose";

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
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <Create onPostCreate={loadPosts} />
            </div>
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col">
              {posts.map((post) => (
                <div className="card bg-dark text-white mb-1" key={post._id}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-1">
                      <h5 className="card-title">{post.user.username}</h5>
                      <DeleteBtn onPostDelete={loadPosts}/>
                    </div>
                    <h6 className="card-subtitle">
                      <em>
                        {moment(post.timestamp).format("MM/DD/YYYY HH:mm")}
                      </em>
                    </h6>
                    <p className="card-text">{post.post}</p>
                  </div>

                  {post.comments && (
                    <ul className="list-group mx-1">
                      {post.comments.map((comment) => (
                        <li
                          className="list-group-item list-group-item-action bg-dark text-white"
                          key={comment.id}
                        >
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1">{comment.user.username}</h6>
                            <small>{moment(comment.createdAt).format(
                              "MM/DD/YYYY HH:mm"
                            )}</small>
                          </div>
                          <p>{comment.comment}</p>
                        </li>
                      ))}
                    </ul>
                  )}
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
