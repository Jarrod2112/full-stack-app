import React, { useEffect, useState } from "react";
import postResources from "../../resources/post";
import moment from "moment";


export const List = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postResources.allPosts().then((response) => {
      setPosts(response);
    });
  }, []);

  return (
    <div>
      <h1>All Post</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <em>{post.post}</em> -{post.username} -{moment(post.timestamp).calendar()}
        </div>
      ))}
    </div>
  );
};
