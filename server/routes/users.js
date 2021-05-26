const { Router } = require("express");
const { ObjectId } = require("mongodb");
const db = require("../mongo/MongoSingleton");

const usersRouter = Router();

// Get the current logged in user
usersRouter.get("/", async (req, res) => {
  const collection = db.getInstance().collection("users");
  if (!req.user) {
    return res.status(404).send("NOT_LOGGED_IN");
  }

  const user = await collection.findOne({ _id: new ObjectId(req.user._id) });
  if (!user) {
    res.status(404).send("NOT_FOUND");
  }
  return res.json(user);
});

module.exports = usersRouter;
