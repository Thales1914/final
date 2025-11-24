import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  function login(tokenRecebido) {
    setToken(tokenRecebido);
    localStorage.setItem("token", tokenRecebido);
    setIsAuthenticated(true);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  // Se o token sumir, atualizar estado
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
