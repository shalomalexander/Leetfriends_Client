import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  // baseURL: "http://localhost:3000",
});

export default api;
