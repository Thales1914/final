import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Intercepta requisição e adiciona o token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepta respostas 401 (sessão expirada)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("Sua sessão expirou. Faça login novamente.");

      sessionStorage.removeItem("token");
      window.location.href = "/admin";
    }
    return Promise.reject(error);
  }
);

export default api;
