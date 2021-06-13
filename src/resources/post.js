import http from '../utils/http';

const allPosts = () => {
    return http.get("/api/posts");
};

export default { allPosts };