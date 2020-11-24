import axios from "axios";

export default axios.create({
  baseURL: "http://3.131.221.80:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
