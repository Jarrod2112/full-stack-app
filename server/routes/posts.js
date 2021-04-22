const { Router } = require('express');

const postsRouter = Router();

// our database
const posts = [
    {
      id: 0,
      post: "Setting up my social media!",
      timestamp: new Date(2002, 3, 7),
      username: "Jack",
    },
  ];
  
  // 1. Add an incrementing id to new posts
  // 2. Add an endpoint to delete a post by id `DELETE /api/posts/:id`
  
  let id = 1; 
  postsRouter.post("/", function (req, res) {
    const post = req.body.post;
    const username = req.body.username;
    const newPost = {
        id: id,
        post: post,
        username: username,
        timestamp: new Date(),
      };
      id++;
      posts.push(newPost);
      return res.json(newPost);
  });
  /*
  There are a few ways for information/data to be passed in with a request:
  1. On the body of a request
  2. In a URL parameter
  3. In a query string
  */
  
  /**
   * This endpoint specifies that a parameter in the position of
   * :id will get added to req.params.id
   */
  postsRouter.delete("/:id", function (req, res) {
      const id = parseInt(req.params.id); // all parameters come through as strings, you have to parse it yourself accordingly
  
      const postIndex = posts.findIndex(post => post.id === id);
      posts.splice(postIndex, 1);
  
      return res.json({ id });
  });
  
  // Post Functionality
  postsRouter.get("/", function (req, res) {
    return res.json(posts);
    // res.send(JSON.stringify([]))
  });

  module.exports = postsRouter;
