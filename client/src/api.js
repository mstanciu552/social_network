import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3030/",
  headers: {
    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
