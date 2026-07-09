const TOKEN_KEY = "token";
const USER_KEY = "user";

/**
 * Save JWT token
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get JWT token
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove JWT token
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Save logged-in user
 */
export const setUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get logged-in user
 */
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
};

/**
 * Remove logged-in user
 */
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Clear authentication data
 */
export const clearAuthStorage = () => {
  removeToken();
  removeUser();
};

/**
 * Check whether user is logged in
 */
export const isAuthenticated = () => {
  return !!getToken();
};