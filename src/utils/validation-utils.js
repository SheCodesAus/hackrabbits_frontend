export const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return false;
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    return phoneRegex.test(phoneNumber.replace(/\s+/g, ''));
  };
  
  export const validateLinkedInUrl = (url) => {
    if (!url) return false;
    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    return linkedinRegex.test(url);
  };
  
  // Add this function to export sanitizeFormData
  export const sanitizeFormData = (formData) => {
    return {
      ...formData,
      username: formData.username.trim().toLowerCase(),
      email: formData.email.trim().toLowerCase(),
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      phone_number: formData.phone_number.replace(/\D/g, ''),
      linkedin: formData.linkedin.trim(),
      location: formData.location.trim(),
      current_role: formData.current_role.trim(),
      ...(formData.userType === 'ROLE_MODEL' && {
        industry: formData.industry?.trim(),
        inspiration: formData.inspiration?.trim(),
        advice: formData.advice?.trim(),
        milestone: formData.milestone?.trim()
      })
    };
  };

  export const validateLoginForm = (formData) => {
    const errors = {};
  
    // Username validation
    if (!formData.username) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (formData.username.length > 30) {
      errors.username = 'Username must be less than 30 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers, and underscores';
    }
  
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and numbers';
    }
  
    return errors;
  };