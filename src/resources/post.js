import http from '../utils/http';

const createPost = (post) => {
    return http.post("/api/posts", {
        post: post
    });
};

const allPosts = () => {
    return http.get("/api/posts");
};

export default {
    createPost,
    allPosts
};