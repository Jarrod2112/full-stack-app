const { ObjectId } = require("mongodb");
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const passport = require('passport');
const mongo = require("../mongo/MongoSingleton");

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const collection = mongo.getInstance().collection("users");

  // check if user already exists
  const user = await collection.findOne({ username });

  // if so, reject the request
  if (user) {
    return res.status(409).send("User already exists!");
  }

  const salt = bcrypt.genSaltSync(10);

  // hash the password
  const newUser = {
    _id: new ObjectId(),
    username,
    password: bcrypt.hashSync(password, salt),
  };

  // create a new user in DB
  await collection.insertOne(newUser);

  // log the user in
  req.login({ _id: newUser._id, username }, (err) => {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    // return some success message
    return res.json("Logged in");
  });
});

authRouter.post("/login", 
  passport.authenticate('local'),
  (req, res) => {
    console.log(req.user);
    res.json('ok');
  });

module.exports = authRouter;
