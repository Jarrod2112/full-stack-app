import http from "../utils/http";

const currentUser = () => {
  return http.get("/api/users");
};

const getProfile = () => {
  return http.get("/api/users/profile");
};
const saveProfile = (profile) => {
  return http.patch("/api/users/profile", profile);
};
const search = (searchTerm) => {
  return http.get(`/api/users/search/${searchTerm}`);
};

const usersResources = {
  currentUser,
  search,
  saveProfile,
  getProfile,
};

export default usersResources;
