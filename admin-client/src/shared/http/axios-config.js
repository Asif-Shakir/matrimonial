import axios from "axios";
const userData = JSON.parse(localStorage.getItem("_authState"));
const token = userData ? userData?.token : "";
export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
