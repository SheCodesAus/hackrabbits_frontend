import { API_BASE_URL } from "../config/constants";

/**
 * Validate credentials before sending the request.
 * This helper function ensures that the `username` and `password` fields
 * are present in the `credentials` object before making the login request.
 *
 * @param {Object} credentials - User credentials, should contain `username` and `password`
 * @throws {Error} Throws an error if `username` or `password` is missing.
 * @returns {boolean} Returns `true` if credentials are valid.
 */
const validateCredentials = (credentials) => {
  if (!credentials.username || !credentials.password) {
    throw new Error("Username and password are required");
  }
  return true;
};

/**
 * Handle user authentication by making a POST request to the backend with the provided credentials.
 * This function sends a POST request to the `/api-token-auth/` endpoint to authenticate the user.
 * If successful, it stores the authentication token in `localStorage`.
 *
 * @param {Object} credentials - User credentials containing `username` and `password`
 * @returns {Promise} Resolves with the response data if login is successful, including the auth token.
 * @throws {Error} Throws an error if the login fails (invalid credentials, server error, etc.)
 */
export const loginUser = async (credentials) => {
  try {
    // Validate credentials
    validateCredentials(credentials);

    // Send POST request to authenticate the user
    const response = await fetch(`${API_BASE_URL}/api-token-auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    // If response is not OK, throw an error with the server's message or a generic one
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Store the received token in localStorage for further authenticated requests
    localStorage.setItem("authToken", data.token);
    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to login");
  }
};

/**
 * Get the headers required for authenticated requests.
 * This function retrieves the stored authentication token from `localStorage`
 * and returns an object with the token included in the `Authorization` header.
 *
 * @returns {Object} The headers object containing the Authorization header with the stored token.
 * @throws {Error} Throws an error if no token is found in localStorage or if the token is expired.
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");

  // If no token is found, throw an error
  if (!token) {
    throw new Error("No authentication token found");
  }

  // Optional: Check if the token is expired (if using JWT)
  const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT to get expiration info
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

  // If the token has expired, throw an error
  if (expirationTime < Date.now()) {
    throw new Error("Authentication token has expired");
  }

  // Return the headers with the Authorization token
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/**
 * Logout the user by removing the authentication token from localStorage
 * and optionally redirecting to the login page.
 * This function clears the stored token, effectively logging the user out,
 * and optionally performs a redirect to the login page (or other route).
 *
 * @returns {void} This function doesn't return anything, but triggers a logout process.
 */
export const logoutUser = () => {
  localStorage.removeItem("authToken");

  // Redirect user to login page (change this URL as needed)
  window.location.href = "/login"; // Change '/login' to your login route
};

/**
 * Check if the user is authenticated by verifying the presence and validity of the auth token.
 * This function checks if there is a valid token stored in `localStorage`, and ensures it is not expired.
 *
 * @returns {boolean} Returns `true` if the user is authenticated (i.e., the token is present and valid),
 *                    otherwise returns `false`.
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");

  // If no token is found, the user is not authenticated
  if (!token) return false;

  // Optional: Check token expiration
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

  // If the token is expired, return false
  return expirationTime > Date.now(); // Token is valid if not expired
};
