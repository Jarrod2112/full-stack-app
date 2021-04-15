const path = require('path');
const express = require("express");
const app = express();

// GET, POST, PUT, PATCH, DELETE

// this parses POST bodies as JSON
app.use(express.json());

// our database
const posts = [
    {
        id: 0,
        post: "Setting up my social media!",
        timestamp: new Date(2002, 3, 7),
        username: 'Jack'
    }
];

// 1. Add an incrementing id to new posts
// 2. Add an endpoint to delete a post by id `DELETE /api/posts/:id`

app.post('/api/posts', function(req, res) {
    const post = req.body.post;
    const username = req.body.username;
    const newPost = {
        post: post, 
        username: username,
        timestamp: new Date()
    };
    posts.push(newPost);
    return res.json(newPost);
})

// Post Functionality
app.get('/api/posts', function(req, res) {
    return res.json(posts);
    // res.send(JSON.stringify([]))
});

// Handle an HTTP GET request to /
const publicAssets = path.join(__dirname, '../public');
console.log('Serving public assets from ', publicAssets);
app.use(express.static(publicAssets));


// This makes the server start listening to HTTP requests on port 4000
app.listen(4000, () => {
    console.log('Listening on http://localhost:4000');
});
