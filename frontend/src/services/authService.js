import api from "../config/axios";
import { AUTH_API } from "../constants/api";

/**
 * Register a new user.
 * @param {Object} userData
 * @returns {Promise<Object>}
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post(
      AUTH_API.REGISTER,
      userData
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Registration failed.",
      }
    );
  }
};

/**
 * Login an existing user.
 * @param {Object} credentials
 * @returns {Promise<Object>}
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post(
      AUTH_API.LOGIN,
      credentials
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Login failed.",
      }
    );
  }
};