import React, { useEffect, useState } from "react";
import postResources from "../../resources/post";
import moment from "moment";
import { Create } from "./create";

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
      <Create onPostCreate={loadPosts} />
      <div class="container">
        {
          <div class="row">
            <div class="col"></div>
            <div class="col">
              {posts.map((post) => (
                <div
                  class="card bg-dark text-white card w-100 mb-1"
                  key={post._id}
                >
                  <div />
                  <em class="card-title text-center">{post.user.username}</em>
                  <em class="card-text">{post.post} </em>
                  <em>
                    {moment(post.timestamp).format("M/DD/YYYY")}
                    <em> </em>
                    {moment(post.timestamp).format("HH:mm")}
                  </em>
                </div>
              ))}
            </div>
            <div class="col"></div>
          </div>
        }
      </div>
    </>
  );
};
