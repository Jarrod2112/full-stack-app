const path = require('path');
const express = require('express');
const app = express();
const mongo = require('./mongo/MongoSingleton');
const apiRouter = require('./routes/api');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs')
const session = require('express-session');
const bodyParser = require('body-parser')


app.use(express);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

// GET, POST, PUT, PATCH, DELETE
async function run() {
  await mongo.initialize('mongodb://localhost:27017/');
  // this parses POST bodies as JSON
  app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
  }));

  app.use(cookieParser('secretcode'));

  // Set up mongo connection 
  // Set up API routes
  app.use('/api', apiRouter);

  // Handle an HTTP GET request to /
  const publicAssets = path.join(__dirname, "../public");
  console.log("Serving public assets from ", publicAssets);
  app.use(express.static(publicAssets));

  app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        res.send("User Created");
      }
    });
  });
}




app.post("login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("User Does Not Exist")
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })

})
// This makes the server start listening to HTTP requests on port 4000
app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});


run();
