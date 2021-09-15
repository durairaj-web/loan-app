import axios from "axios";
import { config } from "../global/config";

const API_URL = config.api_url + "/user";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
        }

        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
