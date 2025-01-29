import React, { useState } from 'react';
import { validatePhoneNumber, validateLinkedInUrl } from "../utils/validation-utils";
import { registerCommunityUser } from "../api/communityuser_profile/post_signup.js";
import { registerRoleModel } from "../api/rolemodeluser_profile/post_signup.js";
import './SignUpPageForm.css';


const SignupPageForm = () => {

  const [formData, setFormData] = useState({
    user_type: 'COMMUNITY_USER',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    image: '',
    current_role: '',
    location: '',
    phone_number: '',
    linkedin: '',
    industry: '',
    inspiration: '',
    advice: '',
    milestones: 'Career change',
    // is_active: true,
    // is_staff: false,
    // is_superuser: false,
    // agreeToTerms: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const errors = {};

    // Common validations
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.first_name.trim()) errors.first_name = 'First name is required';
    if (!formData.last_name.trim()) errors.last_name = 'Last name is required';

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.location.trim()) errors.location = 'Location is required';

    if (!formData.phone_number.trim()) {
      errors.phone_number = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phone_number)) {
      errors.phone_number = 'Invalid phone number format';
    }

    if (!formData.linkedin.trim()) {
      errors.linkedin = 'LinkedIn URL is required';
    } else if (!validateLinkedInUrl(formData.linkedin)) {
      errors.linkedin = 'Invalid LinkedIn URL';
    }

    if (!formData.current_role.trim()) errors.current_role = 'Current role is required';

    // Role Model specific validations
    if (formData.user_type === 'ROLE_MODEL') {
      if (!formData.industry.trim()) errors.industry = 'Industry is required';
      if (!formData.inspiration.trim()) errors.inspiration = 'Inspiration is required';
      if (!formData.advice.trim()) errors.advice = 'Advice is required';
      if (!formData.milestones.trim()) errors.milestones = 'Milestone is required';
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');


    // Debugging log
    console.log("Submitting user data:", formData);

    // Validate form data
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      let result;
      if (formData.user_type === 'COMMUNITY_USER') {
        // Submit to the Community User endpoint
        result = await registerCommunityUser(formData);
      } else if (formData.user_type === 'ROLE_MODEL') {
        // Submit to the Role Model endpoint
        result = await registerRoleModel(formData);
      }

      console.log("Signup response:", result);

      setSuccessMessage('Account created successfully!');
      // Reset form to initial state
      setFormData({
        user_type: 'COMMUNITY_USER',
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        image: '',
        current_role: '',
        location: '',
        phone_number: '',
        linkedin: '',
        // industry: '',
        inspiration: '',
        advice: '',
        milestones: 'Career change',
        // is_active: true,
        // is_staff: false,
        // is_superuser: false,
        // agreeToTerms: false
      });
    } catch (err) {


      console.error("Signup error:", err.message);

      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };





  // I want the form on sign up for community user point to this endpoint: registerCommunityUser


  // for role model user poin to this endpoint. registerRoleModel





  return (
    <div className="signup-form">
      <div className="signup-container">
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">* Required fields</p>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {error && typeof error === 'string' && (
          <div className="error-message">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="signup-form-container">
          <div className="form-group">
            <label htmlFor="user_type" className="form-label">Account Type *</label>
            <select
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              required
              className="form-input"
              disabled={isLoading}
            >
              <option value="COMMUNITY_USER">Community Member</option>
              <option value="ROLE_MODEL">Role Model</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name" className="form-label">First Name *</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className={`form-input ${error?.first_name ? 'error' : ''}`}
                disabled={isLoading}
              />
              {error?.first_name && <span className="error-text">{error.first_name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="last_name" className="form-label">Last Name *</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className={`form-input ${error?.last_name ? 'error' : ''}`}
                disabled={isLoading}
              />
              {error?.last_name && <span className="error-text">{error.last_name}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={`form-input ${error?.username ? 'error' : ''}`}
              disabled={isLoading}
            />
            {error?.username && <span className="error-text">{error.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`form-input ${error?.email ? 'error' : ''}`}
              disabled={isLoading}
            />
            {error?.email && <span className="error-text">{error.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`form-input ${error?.password ? 'error' : ''}`}
              disabled={isLoading}
            />
            {error?.password && <span className="error-text">{error.password}</span>}
            <span className="helper-text">
              Must be at least 8 characters and include uppercase, lowercase, and numbers
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="phone_number" className="form-label">Phone Number </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              // required
              // className={`form-input ${error?.phone_number ? 'error' : ''}`}
              disabled={isLoading}
              placeholder="+1234567890"
            />
            {error?.phone_number && <span className="error-text">{error.phone_number}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="current_role" className="form-label">Current Role *</label>
            <input
              type="text"
              id="current_role"
              name="current_role"
              value={formData.current_role}
              onChange={handleChange}
              required
              className={`form-input ${error?.current_role ? 'error' : ''}`}
              disabled={isLoading}
            />
            {error?.current_role && <span className="error-text">{error.current_role}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">Location *</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className={`form-input ${error?.location ? 'error' : ''}`}
              disabled={isLoading}
            >
              <option value="">Select a location</option>
              <option value="PERTH">Perth</option>
              <option value="ADELAIDE">Adelaide</option>
              <option value="MELBOURNE">Melbourne</option>
              <option value="HOBART">Hobart</option>
              <option value="CANBERRA">Canberra</option>
              <option value="SYDNEY">Sydney</option>
              <option value="BRISBANE">Brisbane</option>
              <option value="DARWIN">Darwin</option>
            </select>
            {error?.location && <span className="error-text">{error.location}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="linkedin" className="form-label">LinkedIn URL *</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              required
              className={`form-input ${error?.linkedin ? 'error' : ''}`}
              disabled={isLoading}
              placeholder="https://www.linkedin.com/in/yourprofile"
            />
            {error?.linkedin && <span className="error-text">{error.linkedin}</span>}
          </div>

          {formData.user_type === 'ROLE_MODEL' && (
            <>

              <div className="form-group">
                <label htmlFor="industry" className="form-label">Industry *</label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className={`form-input ${error?.industry ? 'error' : ''}`}
                  disabled={isLoading}
                >
                  <option value="">Select an Industry</option>
                  <option value="EDUCATION">Education</option>
                  <option value="HEALTHCARE">Healthcare</option>
                  <option value="CYBER_SECURITY">Cyber Security</option>
                  <option value="SOFTWARE_ENGINEERING">Software Engineering</option>
                  <option value="DATA_SCIENCE">Data Science</option>
                  <option value="FINANCE">Finance</option>
                  <option value="AI">AI</option>
                  <option value="ENERGY">Energy</option>
                  <option value="TRANSPORTATION">Transportation</option>
                  <option value="VIDEO_GAME_DEV">Video Game Development</option>
                  <option value="GOVERNMENT">Government</option>
                  <option value="MEDIA_ENTERTAINMENT">Media & Entertainment</option>
                  <option value="STARTUP">Startup</option>
                  <option value="NON_PROFIT">Non-Profit</option>
                </select>
                {error?.industry && <span className="error-text">{error.industry}</span>}
              </div>



              <div className="form-group">
                <label htmlFor="inspiration" className="form-label">Your Inspiration *</label>
                <textarea
                  id="inspiration"
                  name="inspiration"
                  value={formData.inspiration}
                  onChange={handleChange}
                  required
                  className={`form-input ${error?.inspiration ? 'error' : ''}`}
                  disabled={isLoading}
                  rows={4}
                />
                {error?.inspiration && <span className="error-text">{error.inspiration}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="advice" className="form-label">Your Advice *</label>
                <textarea
                  id="advice"
                  name="advice"
                  value={formData.advice}
                  onChange={handleChange}
                  required
                  className={`form-input ${error?.advice ? 'error' : ''}`}
                  disabled={isLoading}
                  rows={4}
                />
                {error?.advice && <span className="error-text">{error.advice}</span>}
              </div>
            </>
          )}

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              className="form-checkbox"
              disabled={isLoading}
            />
            <label htmlFor="agreeToTerms" className="checkbox-label">
              I agree to the Terms of Service and Privacy Policy *
            </label>
            {error?.agreeToTerms && <span className="error-text">{error.agreeToTerms}</span>}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="login-link">
          Already have an account?
          <a href="/login" className="log-in">
            Log In
          </a>
        </div>
        <div className="invite-link-container">
          <p>Know someone inspiring?</p>
          <Link to="/invite" className="invite-link">
            Invite them to become a role model
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPageForm;