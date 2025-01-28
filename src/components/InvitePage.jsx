import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InvitePage.css';
import { sendInvitation } from '../api/invitations/post_invite';


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
      const response = await fetch('https://sheinspires-e47cb098889c.herokuapp.com/invitations/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
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
          Know someone who could inspire others? Invite them to join!
        </p>

        {submitStatus === 'success' && (
          <div className="success-message">
            Invitation sent successfully!
          </div>
        )}

        {errors.submit && (
          <div className="error-message">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Their Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={errors.fullName ? 'form-input error' : 'form-input'}
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <span className="error-text">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Their Email <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={errors.email ? 'form-input error' : 'form-input'}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Their Industry <span className="required">*</span>
            </label>
            <select
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
            <label>
              Their Current Role <span className="required">*</span>
            </label>
            <input
              type="text"
              name="currentRole"
              value={formData.currentRole}
              onChange={handleChange}
              required
              className={errors.currentRole ? 'form-input error' : 'form-input'}
              disabled={isSubmitting}
            />
            {errors.currentRole && (
              <span className="error-text">{errors.currentRole}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Why are they inspiring? <span className="required">*</span>
            </label>
            <textarea
              name="whyInspiring"
              value={formData.whyInspiring}
              onChange={handleChange}
              required
              className={errors.whyInspiring ? 'form-input error' : 'form-input'}
              disabled={isSubmitting}
              rows={4}
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