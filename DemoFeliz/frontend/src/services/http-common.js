import axios from "axios";

export default axios.create({
  baseURL: "http://18.218.244.49:8080/api",
  //baseURL: "http://3.138.173.26:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
