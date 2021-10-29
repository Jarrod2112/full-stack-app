const { Router, request } = require("express");
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

usersRouter.get("/search/:term", async (req, res) => {
  const collection = db.getInstance().collection("users");
  const friendRequestsCollection = db.getInstance().collection("friend-requests");
  const { user, params: { term: searchTerm } } = req;
  if (!user) {
    return res.status(404).send("NOT_LOGGED_IN");
  }

  const results = await collection
    .find({ username: { $regex: searchTerm } })
    .project({ _id: 1, username: 1 })
    .toArray();

  // Add flag for existing friends
  if (Array.isArray(user.friends)) {
    results.forEach(result => {
      result.isFriend = user.friends.some(friend => friend.userId.equals(result._id));
    })
  }
  const requests = await friendRequestsCollection.find({ fromUserId: new ObjectId(user._id) }).toArray();
  results.forEach(result => {
    
    // Add flag for requested friends
    result.isRequested = requests.some(request => request.toUserId.equals(result._id));


    // Add flag for self
    result.isSelf = result._id.equals(user._id);
  });


  return res.json(results);
});

module.exports = usersRouter;
