import axios from "axios";
import { config } from "../global/config";

const API_URL = config.api_url + "/misc";

class DahboardService {
  getSystemInfo() {
    return axios.get(API_URL + "/system");
  }
}

export default new DahboardService();
