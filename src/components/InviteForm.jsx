import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InviteForm.css';

const InvitePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    industry: '',
    currentRole: '',
    whyInspiring: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
    }

    if (!formData.currentRole.trim()) {
      newErrors.currentRole = 'Current role is required';
    }

    if (!formData.whyInspiring.trim()) {
      newErrors.whyInspiring = 'Please tell us why they inspire you';
    } else if (formData.whyInspiring.length < 20) {
      newErrors.whyInspiring = 'Please provide a more detailed response (minimum 20 characters)';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('');
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/invitations/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          industry: formData.industry,
          currentRole: formData.currentRole,
          whyInspiring: formData.whyInspiring
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send invitation');
      }

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        industry: '',
        currentRole: '',
        whyInspiring: ''
      });
    } catch (error) {
      console.error('Invitation error:', error);
      setSubmitStatus('error');
      setErrors({
        submit: error.message || 'Failed to send invitation. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
};

  return (
    <div className="invite-page">
      <header className="invite-header">
        <h1>Invite a Role Model</h1>
      </header>

      <div className="invite-form-container">
        <h2>Invite Someone Inspiring</h2>
        <p className="invite-subtitle">
          Know someone who could inspire others? Invite them to join by entering their details below...
        </p>

        {submitStatus === 'success' && (
          <div className="success-message">
            Invitation sent successfully! Thank you for helping us grow our community.
          </div>
        )}

        {errors.submit && (
          <div className="error-message">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="invite-form">
          <div className="form-group">
            <label htmlFor="fullName">
              Full Name <span className="required">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={errors.fullName ? 'form-input error' : 'form-input'}
              disabled={isSubmitting}
              placeholder="Enter their full name"
            />
            {errors.fullName && (
              <span className="error-text">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={errors.email ? 'form-input error' : 'form-input'}
              disabled={isSubmitting}
              placeholder="Email address"
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="industry">
            What industry are they in? <span className="required">*</span>
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className={errors.industry ? 'form-input error' : 'form-input'}
              disabled={isSubmitting}
            >
              <option value="">Select an industry</option>
              <option value="SOFTWARE_ENGINEERING">Software Engineering</option>
              <option value="EDUCATION">Education</option>
              <option value="HEALTHCARE">Healthcare</option>
              <option value="BUSINESS">Business</option>
              <option value="ARTS">Arts</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.industry && (
              <span className="error-text">{errors.industry}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="currentRole">
             Current role: <span className="required">*</span>
            </label>
            <input
              id="currentRole"
              type="text"
              name="currentRole"
              value={formData.currentRole}
              onChange={handleChange}
              required
              className={errors.currentRole ? 'form-input error' : 'form-input'}
              disabled={isSubmitting}
              placeholder="Enter their current role"
            />
            {errors.currentRole && (
              <span className="error-text">{errors.currentRole}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="whyInspiring">
              Tell us how they inspire you: <span className="required">*</span>
            </label>
            <textarea
              id="whyInspiring"
              name="whyInspiring"
              value={formData.whyInspiring}
              onChange={handleChange}
              required
              className={errors.whyInspiring ? 'form-input error' : 'form-input'}
              disabled={isSubmitting}
              rows={4}
              placeholder="Minimum 20 characters"
            />
            {errors.whyInspiring && (
              <span className="error-text">{errors.whyInspiring}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Invitation'}
          </button>
        </form>

        <div className="signup-link">
          Want to become a role model yourself? 
          <Link to="/signup" className="link">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;