const { Router, request } = require("express");
const { ObjectId } = require("mongodb");
const db = require("../mongo/MongoSingleton");
const moment = require('moment')

const usersRouter = Router();

//Get users profile
//usersRouter.get("/profile", async (req, res) => {

//})

usersRouter.get("/profile", async function (req, res) {
  const userId = req.user._id;
  const collection = db.getInstance().collection("users");
  const query = { _id: userId };
  let userProfile = await collection.findOne(query, {
    projection: { profile: 1, _id: 0 }
  })
  return res.json(userProfile); // { profile: { email... } }
});

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


// update the profile on the user
// HTTP PATCH /api/users/profile
usersRouter.patch("/profile", async (req, res) => {

  const userId = req.user._id;
  const collection = db.getInstance().collection("users");

  // update profile fields
  const firstName = req.body.firstName || req.user.profile.firstName;
  const lastName = req.body.lastName || req.user.profile.lastName;
  const phoneNumber = req.body.phoneNumber || req.user.profile.phoneNumber;
  const email = req.body.email || req.user.profile.email;
  let birthday = req.body.birthday || req.user.profile.birthday;

  if (birthday) {
    birthday = moment(birthday).toDate();
  }

  const newProfile = { firstName, lastName, birthday, phoneNumber, email };

  await collection.updateOne({ _id: userId }, { $set: { profile: newProfile } });
  // return something
  return res.status(200).send("Profile created");
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
