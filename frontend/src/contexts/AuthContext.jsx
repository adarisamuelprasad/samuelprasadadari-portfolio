import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "@/api/api";
const AuthContext = createContext(void 0);
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);
  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      const { token } = response.data;
      localStorage.setItem("jwt_token", token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
  };
  return <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>{children}</AuthContext.Provider>;
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
export {
  AuthProvider,
  useAuth
};
