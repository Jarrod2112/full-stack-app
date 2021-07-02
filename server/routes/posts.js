const { ObjectID, Timestamp } = require("bson");
const { Router, json } = require("express");
const { BSONType } = require("mongodb");
const db = require("../mongo/MongoSingleton");
module.exports = { Router };

const postsRouter = Router();

postsRouter.post("/", async function (req, res) {
  const post = req.body.post;
  const newPost = {
    post: post,
    user: {
      username: req.user.username,
      id: req.user._id,
    },
    timestamp: new Date(),
    comments: []
  };
  const result = await db.getInstance().collection("posts").insertOne(newPost);
  res.status(201).send({});
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
// GET /api/posts/search?start=2021-01-01T00:00:00.000&end=2021-05-01T00:00:00.000
// postsRouter.get("/search", (req, res) => { req.query.start })

// POST /api/posts/comments/:id
postsRouter.post("/comments/:id", async function (req, res) {
  const id = ObjectID(req.params.id);
  const collection = db.getInstance().collection("posts");
  let query = { _id: id };
  const username = req.body.username;
  const comment = req.body.comment;
  const newComment = {
    user: {
      username: req.user.username,
      id: req.user._id,
    },
    username,
    comment: comment,
    timestamp: new Date(),
    id: new ObjectID(),
  };
  await collection.updateOne(query, { $push: { comments: newComment } });
  return res.json(newComment.id);
});

postsRouter.get("/:username", async function (req, res) {
  const user = req.params.username;
  const collection = db.getInstance().collection("posts");
  let query = { username: user };
  const result = await collection.findOne(query);
  return res.json(result);
});
postsRouter.get("/:id", async function (req, res) {
  // get a post by id
  const id = ObjectID(req.params.id);
  const collection = db.getInstance().collection("posts");
  let query = { _id: id };
  const cursor = await collection.findOne(query);
  return res.json(cursor);
});

postsRouter.delete("/:id", async function (req, res) {
  const id = ObjectID(req.params.id);
  const collection = db.getInstance().collection("posts");
  let query = { _id: id };
  const result = await collection.deleteOne(query);
  return res.json(result);
});

// Post Functionality
// GET /api/posts
postsRouter.get("/", async function (req, res) {
  const result = await db.getInstance().collection("posts").find({}).toArray();
  return res.json(result);
  // res.send(JSON.stringify([]))
});

module.exports = postsRouter;
