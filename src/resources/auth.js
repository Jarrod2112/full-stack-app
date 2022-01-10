import http from "../utils/http";

function login(username, password) {
  return http.post("/api/auth/login", { username, password });
}

function register(username, password) {
  return http.post("/api/auth/register", { username, password });
}

function logout() {
  return http.get("/api/auth/logout");
}

const authResources = {
  login,
  register,
  logout,
};

export default authResources;
