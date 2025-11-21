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

      return token; // RETORNAR O TOKEN AQUI !!!
    } catch (err) {
      setError("Usuário ou senha inválidos");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
    error,
  };
}
