import axios from "axios";

const baseURL = "http://localhost:5050/api";
const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    throw error;
  }
);

export default instance;
