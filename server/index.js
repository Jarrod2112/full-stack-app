const express = require("express");
const app = express();

// GET, POST, PUT, PATCH, DELETE

// Handle an HTTP GET request to /
app.get('/', function(request, response) {
    response.send('<h1>Welcome to my site!</h1>');
});

// This makes the server start listening to HTTP requests on port 4000
app.listen(4000, () => {
    console.log('Listening on http://localhost:4000');
});
