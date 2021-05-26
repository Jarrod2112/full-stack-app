import http from '../utils/http';

function login(username, password) {
    return http.post('/api/auth/login', { username, password });
}

function register(username, password) {
    return http.post('/api/auth/register', { username, password });
}

export default {
    login, register
}
