// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token from localStorage (matches AuthContext)
api.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem("cobuilders_user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (err) {
      console.error("Error reading token:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: Auto-logout if unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — logging out user.");
      localStorage.removeItem("cobuilders_user");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;

