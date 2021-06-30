import React, { useEffect, useState } from "react";
import postResources from "../../resources/post";
import moment from "moment";
import { Create } from "./create";
import { Comment } from "./comment";


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
          {
            <div className="row">
              <div className="col"></div>
              <div className="col">
                {posts.map((post) => (
                  <div
                    className="card bg-dark text-white card w-100 mb-1"
                    key={post._id}
                  >
                    <div />
                    <em className="card-text">{post.post} </em>
                    <em>
                      {moment(post.timestamp).format("M/DD/YYYY")}
                      <em> </em>
                      {moment(post.timestamp).format("HH:mm")}
                    </em>
                    
                      {posts.map((post) => (
                        <div
                          className="card bg-dark text-white card w-100 mb-1"
                          key={post.comments}
                        >
                          <em>{post.comments}</em>
                        </div>
                      ))}
                    
                    <Comment post={post} />
                  </div>
                ))}

              </div>
              <div className="col"></div>
            </div>
          }
        </div>
      </div>
    </>
  );
}