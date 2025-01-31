import { API_BASE_URL } from "../config/constants";

/**
 * Handle user authentication
 * @param {Object} credentials - User credentials
 * @returns {Promise} - Authentication response
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api-token-auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.non_field_errors?.[0] || "Login failed");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to login");
  }
};

/**
 * Get authentication headers
 * @returns {Object} - Headers with auth token
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem("authToken");
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};
