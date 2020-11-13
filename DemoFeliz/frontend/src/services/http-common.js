import axios from "axios";

export default axios.create({
  baseURL: "172.31.8.235:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
