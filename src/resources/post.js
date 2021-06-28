import http from '../utils/http';

const createPost = (post) => {
    return http.post("/api/posts", {
        post: post
    });
};

const allPosts = () => {
    return http.get("/api/posts");
};

const createComment = (comment, postId) => {
    return http.post(`/api/posts/comments/${postId}`, {
        comment: comment,
        
    });
}

const allComments = () => {
    return http.get("/api/posts/comments");
}
export default {
    createPost,
    allPosts,
    createComment,
    allComments,
};