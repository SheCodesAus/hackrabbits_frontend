import { API_BASE_URL } from '../../config/constants';
import { sanitizeFormData } from '../../utils/validation-utils';

/**
 * Register a new community user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Registration response
 */
export const registerCommunityUser = async (userData) => {
  try {
    const sanitizedData = sanitizeFormData(userData);
    
    const response = await fetch(`${API_BASE_URL}/community-user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: sanitizedData.username,
        password: sanitizedData.password,
        first_name: sanitizedData.first_name,
        last_name: sanitizedData.last_name,
        email: sanitizedData.email,
        user_type: 'COMMUNITY_USER',
        image: sanitizedData.image,
        current_role: sanitizedData.current_role,
        location: sanitizedData.location,
        phone_number: sanitizedData.phone_number,
        linkedin: sanitizedData.linkedin
      })
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        if (data.username) {
          throw new Error('Username already exists');
        }
        if (data.email) {
          throw new Error('Email already registered');
        }
        throw new Error(Object.values(data)[0]);
      }
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to register user');
  }
};