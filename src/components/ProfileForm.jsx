import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = ({ userId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    username: '',
    phone_number: '',
    industry: '',
    current_role: '',
    linkedin: '',
    location: '',
    image: '',
    user_type: 'COMMUNITY_USER'
  });

  const [errors, setErrors] = useState({});

  const industries = [
    'EDUCATION',
    'HEALTHCARE',
    'CYBER_SECURITY',
    'SOFTWARE_ENGINEERING',
    'DATA_SCIENCE',
    'FINANCE',
    'AI',
    'ENERGY',
    'TRANSPORTATION',
    'VIDEO_GAME_DEV',
    'GOVERNMENT',
    'MEDIA_ENTERTAINMENT',
    'STARTUP',
    'NON_PROFIT'
  ];

  const locations = [
    'PERTH',
    'ADELAIDE',
    'MELBOURNE',
    'HOBART',
    'CANBERRA',
    'SYDNEY',
    'BRISBANE',
    'DARWIN'
  ];

  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/community-users/${userId}/`, {
            headers: {
              'Authorization': `Token ${localStorage.getItem('token')}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setFormData(data);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
      fetchProfile();
    }
  }, [userId]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!userId && !formData.password) newErrors.password = 'Password is required';
    if (!formData.current_role) newErrors.current_role = 'Current role is required';
    if (!formData.location) newErrors.location = 'Location is required';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      username: name === 'email' ? value.split('@')[0] : prev.username
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const url = userId 
        ? `${import.meta.env.VITE_API_URL}/community-users/${userId}/`
        : `${import.meta.env.VITE_API_URL}/community-user/signup/`;
      
      const method = userId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...(userId && { 'Authorization': `Token ${localStorage.getItem('token')}` })
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save profile');
      }

      const data = await response.json();
      if (!userId && data.token) {
        localStorage.setItem('token', data.token);
      }
      navigate('/profile');
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to save profile. Please try again.'
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}

      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className={`form-input ${errors.first_name ? 'error' : ''}`}
        />
        {errors.first_name && (
          <span className="error-text">{errors.first_name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className={`form-input ${errors.last_name ? 'error' : ''}`}
        />
        {errors.last_name && (
          <span className="error-text">{errors.last_name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? 'error' : ''}`}
        />
        {errors.email && (
          <span className="error-text">{errors.email}</span>
        )}
      </div>

      {!userId && (
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? 'error' : ''}`}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="form-input"
          placeholder="+61XXXXXXXXX"
        />
      </div>

      <div className="form-group">
        <label htmlFor="industry">Industry</label>
        <select
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className={`form-input ${errors.industry ? 'error' : ''}`}
        >
          <option value="">Select an industry</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry.replace('_', ' ')}
            </option>
          ))}
        </select>
        {errors.industry && (
          <span className="error-text">{errors.industry}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="current_role">Current Role</label>
        <input
          type="text"
          id="current_role"
          name="current_role"
          value={formData.current_role}
          onChange={handleChange}
          className={`form-input ${errors.current_role ? 'error' : ''}`}
        />
        {errors.current_role && (
          <span className="error-text">{errors.current_role}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`form-input ${errors.location ? 'error' : ''}`}
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
        {errors.location && (
          <span className="error-text">{errors.location}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="linkedin">LinkedIn URL</label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          className="form-input"
          placeholder="https://www.linkedin.com/in/yourprofile"
        />
      </div>

      <button type="submit" className="submit-button">
        {userId ? 'Update Profile' : 'Create Profile'}
      </button>
    </form>
  );
};

export default ProfileForm;