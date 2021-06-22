import http from '../utils/http';

const createPost = (post) => {
    return http.post("/api/posts", {
        post: post
    });
};

const allPosts = () => {
    return http.get("/api/posts");
};

const createComment = (comment) => {
    return http.post("/api/posts/comments/:id", {
        comment: comment
    });
}

export default {
    createPost,
    allPosts,
    createComment,
};