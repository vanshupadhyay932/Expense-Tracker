import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import {
  setToken,
  setUser,
  getToken,
  getUser,
  clearAuthStorage,
} from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setCurrentUser] = useState(getUser());
  const [token, setCurrentToken] = useState(getToken());
  const [loading, setLoading] = useState(true);

  /**
   * Restore login on page refresh
   */
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();

    if (storedToken && storedUser) {
      setCurrentToken(storedToken);
      setCurrentUser(storedUser);
    }

    setLoading(false);
  }, []);

  /**
   * Login
   */
  const login = async (credentials) => {
    const response = await loginUser(credentials);

    const { user, token } = response.data;

    setToken(token);
    setUser(user);

    setCurrentToken(token);
    setCurrentUser(user);

    return response;
  };

  /**
   * Register
   */
  const register = async (userData) => {
    const response = await registerUser(userData);

    const { user, token } = response.data;

    setToken(token);
    setUser(user);

    setCurrentToken(token);
    setCurrentUser(user);

    return response;
  };

  /**
   * Logout
   */
  const logout = () => {
    clearAuthStorage();

    setCurrentUser(null);
    setCurrentToken(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};