import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token") || null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  function login(tokenRecebido) {
    sessionStorage.setItem("token", tokenRecebido);
    setToken(tokenRecebido);
    setIsAuthenticated(true);
  }

  function logout() {
    sessionStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  // Deslogar automaticamente ao fechar a aba
  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.removeItem("token");
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
