import axios from "axios";

export default axios.create({
  baseURL: "http://58.182.223.185:7070/",
  responseType: "json"
});