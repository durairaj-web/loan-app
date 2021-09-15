import axios from "axios";
import { config } from "../global/config";

const API_URL = config.api_url + "/loan";

class LoanService {
  getProductTypes() {
    return axios.get(API_URL + "/products").then((response) => {
      return response.data;
    });
  }

  createLoan(data: any, file: any) {
    const formData = new FormData();
    formData.append("doc", file);
    formData.append("interestRate", data.interestRate);
    formData.append("loanAmount", data.loanAmount);
    formData.append("productType", data.productType);
    formData.append("terms", data.terms);
    formData.append("userId", data.userId);
    return axios.post(API_URL + "/create", formData).then((response) => {
      return response.data;
    });
  }

  getLoans(userId: number) {
    return axios.get(API_URL + "/all/" + userId);
  }

  donwloadFile(fileName: string) {
    //return axios.get(API_URL + '/files/' + fileName)
    return axios.get(API_URL + "/files/" + fileName).then((response) => {
      const fileLink = document.createElement("a");

      fileLink.href = response.data.data;
      fileLink.setAttribute("download", fileName);
      fileLink.setAttribute("target", "_blank");
      document.body.appendChild(fileLink);

      fileLink.click();
    });
  }
}

export default new LoanService();
