const path = require("path");
const express = require("express");
const app = express();
const apiRouter = require('./routes/api');

// GET, POST, PUT, PATCH, DELETE

// this parses POST bodies as JSON
app.use(express.json());

app.use('/api', apiRouter);

// Handle an HTTP GET request to /
const publicAssets = path.join(__dirname, "../public");
console.log("Serving public assets from ", publicAssets);
app.use(express.static(publicAssets));

// This makes the server start listening to HTTP requests on port 4000
app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
