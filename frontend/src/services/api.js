import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: return data or throw normalized error
API.interceptors.response.use(
  (res) => res,
  (err) => {
    // Normalize
    const message = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || err.message || "API Error";
    const status = err.response?.status;
    const payload = { message, status, data: err.response?.data };
    return Promise.reject(payload);
  }
);

export default API;
