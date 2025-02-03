import { sanitizeFormData } from '../../utils/validation-utils';



export const registerCommunityUser = async (formData) => {
  try {
    const sanitizedData = sanitizeFormData(formData);
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/community-user/signup/`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
     
        body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        first_name: formData.first_name,  
        last_name: formData.last_name,   
        email: formData.email,
        current_role: formData.current_role,
        location: formData.location,
        phone_number: formData.phone_number,
        linkedin: formData.linkedin,
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