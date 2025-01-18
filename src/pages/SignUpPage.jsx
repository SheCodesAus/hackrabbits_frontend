import React, { useState } from 'react';
import './SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    userType: 'general',
    fullName: '',
    email: '',
    password: '',
    industry: '',
    location: '',
    agreeToTerms: false,
    roleModel: {
      currentRole: '',
      organization: '',
      linkedinUrl: '',
      achievements: '',
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'userType' && { roleModel: { currentRole: '', organization: '', linkedinUrl: '', achievements: '' } }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your sign-up submission logic here
  };

  return (
    <div className="signup-form">
      <div className="signup-container">
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">* Required fields</p>

        <form onSubmit={handleSubmit} className="signup-form-container">
          <div className="form-group">
            <label htmlFor="userType" className="form-label">Subject *</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="general">To Be Inspired</option>
              <option value="roleModel">To Inspire</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="form-input"
            />
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
              className="form-input"
            />
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
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="industry" className="form-label">Industry *</label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">Location (City) *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {formData.userType === 'roleModel' && (
            <>
              <div className="form-group">
                <label htmlFor="roleModel.currentRole" className="form-label">Current Role *</label>
                <input
                  type="text"
                  id="roleModel.currentRole"
                  name="roleModel.currentRole"
                  value={formData.roleModel.currentRole}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="roleModel.organization" className="form-label">Organization *</label>
                <input
                  type="text"
                  id="roleModel.organization"
                  name="roleModel.organization"
                  value={formData.roleModel.organization}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="roleModel.linkedinUrl" className="form-label">LinkedIn Profile URL *</label>
                <input
                  type="text"
                  id="roleModel.linkedinUrl"
                  name="roleModel.linkedinUrl"
                  value={formData.roleModel.linkedinUrl}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="roleModel.achievements" className="form-label">Notable Achievements *</label>
                <textarea
                  id="roleModel.achievements"
                  name="roleModel.achievements"
                  value={formData.roleModel.achievements}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="form-input"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              className="form-checkbox"
            />
            <label htmlFor="agreeToTerms" className="form-label">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>

        <div className="login-link">
          Already have an account?<a href="#" className="log-in">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;