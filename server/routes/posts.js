const { Router } = require("express");
const db = require("../mongo/MongoSingleton");

const postsRouter = Router();

postsRouter.post("/", async function (req, res) {
  const post = req.body.post;
  const username = req.body.username;
  const newPost = {
    post: post,
    username: username,
    timestamp: new Date(),
  };
  const result = await db.getInstance().collection("posts").insertOne(newPost);
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
postsRouter.get('/:id', async function(req,res) {
  // get a post by id
})

postsRouter.delete("/:id", function (req, res) {
  // delete a post by id
});

// Post Functionality
postsRouter.get("/", async function (req, res) {
  const result = await db.getInstance().collection("posts").find({}).toArray(); 
  return res.json(result);
  // res.send(JSON.stringify([]))
});

module.exports = postsRouter;
