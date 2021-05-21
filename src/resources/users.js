import axios from "axios";

const currentUser = () => {
  return axios.get("/api/users", { withCredentials: true }).then(response => response.data);
};

export default { currentUser };
