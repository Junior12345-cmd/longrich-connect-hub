// src/services/axiosInstance.ts
import axios from "axios";

// Crée une instance Axios
const axiosInstance = axios.create({
  baseURL:  import.meta.env.BACKEND_URL || "https://darkturquoise-rhinoceros-749906.hostingersite.com", 
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercepteur pour ajouter token si besoin (depuis localStorage)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
