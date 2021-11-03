import http from "../utils/http";

const currentUser = () => {
  return http.get("/api/users");
};
const saveProfile = (user, firstName, lastName, phoneNumber, email, birthday) => {
  return http.patch(`/api/users/profile/${user}`, {
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

export default { currentUser, search, saveProfile };
