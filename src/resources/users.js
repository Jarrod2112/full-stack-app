import http from "../utils/http";

const currentUser = () => {
  return http.get("/api/users");
};

export default { currentUser };
