const path = require("path");
const express = require("express");
const app = express();
const mongo = require("./mongo/MongoSingleton");
const apiRouter = require("./routes/api");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session");
const morgan = require("morgan");
const LocalStrategy = require("./middleware/local-strategy");
const { ObjectId } = require("mongodb");

// GET, POST, PUT, PATCH, DELETE
async function run() {
  await mongo.initialize("mongodb://localhost:27017/");

  app.use(morgan("dev"));

  // this parses POST bodies as JSON
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const MongoSessionStore = mongoSession(session);
  const sessionStore = new MongoSessionStore({
    uri: "mongodb://localhost:27017/",
    databaseName: "social-media",
    collection: 'sessions'
  });

  app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 604800000 },
      store: sessionStore
    })
  );

  // set up passport
  // set up auth strategy
  passport.use(LocalStrategy);

  // set up a way to serialize a user
  passport.serializeUser(function (user, cb) {
    cb(null, user._id);
  });

  // set up a way to deserialize a user
  passport.deserializeUser(async function (id, cb) {
    const collection = mongo.getInstance().collection("users");
    const user = await collection.findOne({ _id: new ObjectId(id) });
    if (!user) {
      return cb("User not found!");
    }
    return cb(null, user);
  });

  // initialize passport
  app.use(passport.initialize());

  // set up session storage
  app.use(passport.session());

  // Set up mongo connection
  // Set up API routes
  app.use("/api", apiRouter);

  // Handle an HTTP GET request to /
  const publicAssets = path.join(__dirname, "../public");
  console.log("Serving public assets from ", publicAssets);
  app.use(express.static(publicAssets));
}

// This makes the server start listening to HTTP requests on port 4000
app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});

run();
