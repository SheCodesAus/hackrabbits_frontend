const API_BASE_URL = 'https://sheinspires-e47cb098889c.herokuapp.com';

export const registerUser = async (userData) => {
  const endpoint = userData.userType === 'ROLE_MODEL' 
    ? '/role-model/signup'
    : '/community-user/signup';

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        ...(userData.userType === 'ROLE_MODEL' && {
          industry: userData.industry,
          inspiration: userData.inspiration,
          advice: userData.advice,
          milestone: userData.milestone
        })
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle specific error cases
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

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api-token-auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store the token in localStorage
    localStorage.setItem('authToken', data.token);
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to login');
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const getUserProfile = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/role-models/public/1`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch user profile');
  }
};