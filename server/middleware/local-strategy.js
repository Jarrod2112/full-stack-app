const {Strategy} = require('passport-local');
const bcrypt = require('bcryptjs');
const mongo = require('../mongo/MongoSingleton');

const LocalStrategy = new Strategy(async function (username, password, done) {
    const collection = mongo.getInstance().collection('users');

  // fetch the user from the DB
  const user = await collection.findOne({ username });

  // if user doesn't exist, reject the request
  if(!user) {
      done('Invalid username or password');
  }

  // check the password against the saved (hashed) password
  const doesPasswordMatch = bcrypt.compareSync(password, user.password);

  // if the password doesn't match, reject the request
  if(!doesPasswordMatch) {
      done('Invalid username or password');
  }

  return done(null, user);
});

module.exports = LocalStrategy;
