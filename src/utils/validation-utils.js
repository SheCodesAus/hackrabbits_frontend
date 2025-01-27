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