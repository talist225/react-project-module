import axios from "axios";

const autoLogin = () => {
  return axios.get("/users/userInfo");
};

export default autoLogin;
