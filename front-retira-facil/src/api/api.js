import axios from "axios";
import { useAuth } from "../context/AuthContext";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // você pode mudar para env futuramente
});

// Interceptor GLOBAL para erros 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("Sessão expirada. Faça login novamente.");
      localStorage.removeItem("token");
      window.location.href = "/admin";
    }
    return Promise.reject(error);
  }
);

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
