import http from '../utils/http';

const createPost = (post) => {
    return http.post("/api/posts", {
        post: post
    });
};

const deletePost = (postId) => {
    return http.post(`/api/posts/${postId}`, {
        postId: postId
    });
}

const allPosts = () => {
    return http.get("/api/posts");
};

const createComment = (comment, postId) => {
    return http.post(`/api/posts/comments/${postId}`, {
        comment: comment,
        
    });
}

export default {
    createPost,
    allPosts,
    createComment,
    deletePost,    
};