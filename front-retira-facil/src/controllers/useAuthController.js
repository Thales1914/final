import { useState } from "react";
import { loginAdmin } from "../api/authService";

export function useAuthController() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(username, password) {
    try {
      setLoading(true);
      setError("");

      const response = await loginAdmin({ username, password });

      const token = response.data.token;
      localStorage.setItem("token", token);

      return true;
    } catch (err) {
      setError("Usuário ou senha inválidos");
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
  }

  return {
    login,
    logout,
    loading,
    error,
  };
}
