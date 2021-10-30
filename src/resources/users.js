import http from "../utils/http";

const currentUser = () => {
  return http.get("/api/users");
};
const search = (searchTerm) => {
  return http.get(`/api/users/search/${searchTerm}`);
}

export default { currentUser, search };
