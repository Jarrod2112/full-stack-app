import http from '../utils/http';

const createPost = () => {
    return http.post("/api/posts");
};

export default { createPost };