import http from "../utils/http";

const currentUser = () => {
  return http.get("/api/users");
};

const getProfile = () => {
  return http.get("/api/users/profile")
}
const saveProfile = (firstName, lastName, phoneNumber, email, birthday) => {
  return http.patch('/api/users/profile', {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
    birthday: birthday,
  });

}
const search = (searchTerm) => {
  return http.get(`/api/users/search/${searchTerm}`);
}

export default {
  currentUser,
  search,
  saveProfile,
  getProfile,
};
