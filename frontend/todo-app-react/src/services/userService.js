// src/services/userService.js
import axios from 'axios';

// Base URL for your FastAPI endpoints.
// Adjust the base URL and port as needed (or use an environment variable).
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/users';


/**
 * Registers a new user.
 * @param {Object} userData - Object containing email, name, and password.
 * @returns {Promise<Object>} API response.
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    // You can customize error handling as needed.
    console.error('Error in registerUser:', error);
    throw error.response?.data || error;
  }
};

/**
 * Confirms a user's registration.
 * @param {Object} data - Object containing email and confirmationCode.
 * @returns {Promise<Object>} API response.
 */
export const confirmUserRegistration = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/confirm`, data);
    return response.data;
  } catch (error) {
    console.error('Error in confirmUserRegistration:', error);
    throw error.response?.data || error;
  }
};

/**
 * Authenticates a user.
 * @param {Object} credentials - Object containing email and password.
 * @returns {Promise<Object>} API response.
 */
export const authenticateUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/authenticate`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error in authenticateUser:', error);
    throw error.response?.data || error;
  }
};

/**
 * Initiates a password reset process.
 * @param {string} email - The user's email.
 * @returns {Promise<Object>} API response.
 */
export const initiatePasswordReset = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/password-reset/initiate`, { email });
    return response.data;
  } catch (error) {
    console.error('Error in initiatePasswordReset:', error);
    throw error.response?.data || error;
  }
};

/**
 * Completes the password reset process.
 * @param {Object} data - Object containing email, newPassword, and confirmationCode.
 * @returns {Promise<Object>} API response.
 */
export const completePasswordReset = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/password-reset/complete`, data);
    return response.data;
  } catch (error) {
    console.error('Error in completePasswordReset:', error);
    throw error.response?.data || error;
  }
};

/**
 * Retrieves a user by their ID.
 * @param {number} id - The user ID.
 * @returns {Promise<Object>} API response.
 */
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw error.response?.data || error;
  }
};

/**
 * Updates a user's information.
 * @param {number} id - The user ID.
 * @param {Object} updateData - The data to update (e.g., name, email, password, etc.).
 * @returns {Promise<Object>} API response.
 */
export const updateUser = async (id, updateData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error.response?.data || error;
  }
};
