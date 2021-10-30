const { Router } = require("express");
const { ObjectId } = require("mongodb");
const db = require("../mongo/MongoSingleton");
const moment = require('moment')

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

// update the profile on the user
// HTTP PATCH /api/users/profile
usersRouter.patch("/profile", async (req, res) => {

  const userId = req.user._id;
  const collection = db.getInstance().collection("users");

  // update profile fields
  const firstName = req.user.profile.firstName || req.body.firstName;
  const lastName = req.user.profile.lastName || req.body.lastName;
  const phoneNumber = req.user.profile.phoneNumber || req.body.phoneNumber;
  const email = req.user.profile.email || req.body.email;
  let birthday = req.user.profile.birthday || req.body.birthday;

  if(birthday) {
    birthday = moment(birthday).toDate();
  }

  const newProfile = { firstName, lastName, birthday, phoneNumber, email };

  await collection.updateOne({ _id: userId }, { $set: { profile: newProfile } });
  // return something
  return res.status(200).send('Profile created');
});

module.exports = usersRouter;
