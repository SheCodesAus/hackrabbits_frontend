const API_BASE_URL = "https://sheinspires-e47cb098889c.herokuapp.com";

/**
 * Validate the login credentials (username and password).
 * @param {Object} credentials - User credentials (username and password).
 * @throws {Error} Throws error if validation fails.
 */
const validateLoginCredentials = (credentials) => {
  if (!credentials.username || !credentials.password) {
    throw new Error("Both username and password are required.");
  }

  // Simple email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(credentials.username)) {
    throw new Error("Please enter a valid email address.");
  }

  if (credentials.password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }
};

/**
 * Login user and retrieve token
 * @param {Object} credentials - User credentials containing `username` (email) and `password`
 * @returns {Promise} Resolves with the authentication response data.
 * @throws {Error} Throws an error if login fails or credentials are invalid.
 */
export const loginUser = async (credentials) => {
  try {
    // Validate credentials
    validateLoginCredentials(credentials);

    // Send POST request for login
    const response = await fetch(`${API_BASE_URL}/login/`, {
      // Updated to use the correct login endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username, // username is the email here
        password: credentials.password,
      }),
    });

    const data = await response.json();

    // Handle different HTTP status codes
    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error("Bad Request. Please check your input.");
        case 401:
          throw new Error("Unauthorized. Incorrect username or password.");
        case 500:
          throw new Error("Server Error. Please try again later.");
        default:
          throw new Error(data.message || "Request failed");
      }
    }

    // Store the token in localStorage
    localStorage.setItem("authToken", data.token);
    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to login");
  }
};

/**
 * Get authentication headers with the stored token
 * @returns {Object} - Headers with auth token for authorized requests.
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authentication token found.");
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/**
 * Get user profile data (public profile)
 * @param {number} userId - ID of the user to fetch the profile for.
 * @returns {Promise} Resolves with the user profile data.
 * @throws {Error} Throws an error if profile fetch fails.
 */
export const getUserProfile = async (userId = 1) => {
  // You might want to dynamically pass the `userId` or `pk` here
  try {
    const response = await fetch(
      `${API_BASE_URL}/role-models/public/${userId}/`,
      {
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to fetch user profile");
  }
};

/**
 * Logout user by removing token from localStorage
 */
export const logoutUser = () => {
  localStorage.removeItem("authToken");
  // Redirect after logout if needed (e.g., redirect to login page)
  window.location.href = "/login"; // You can adjust the redirect path as needed
};

/**
 * Register user (for both role model and community user)
 * @param {Object} userData - User data to register.
 * @returns {Promise} Resolves with registration response.
 * @throws {Error} Throws an error if registration fails.
 */
export const registerUser = async (userData) => {
  const endpoint =
    userData.userType === "ROLE_MODEL"
      ? "/role-model/signup/"
      : "/community-user/signup/";

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        user_type: userData.userType,
        image: userData.image,
        current_role: userData.current_role,
        location: userData.location,
        phone_number: userData.phone_number,
        linkedin: userData.linkedin,
        ...(userData.userType === "ROLE_MODEL" && {
          industry: userData.industry,
          inspiration: userData.inspiration,
          advice: userData.advice,
          milestone: userData.milestone,
        }),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 400) {
        if (data.username) {
          throw new Error("Username already exists");
        }
        if (data.email) {
          throw new Error("Email already registered");
        }
        throw new Error(Object.values(data)[0]);
      }
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to register user");
  }
};
