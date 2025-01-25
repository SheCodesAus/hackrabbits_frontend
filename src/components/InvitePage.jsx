import React, { useState } from 'react';
import styles from './InvitePage.module.css';

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

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate Industry
    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
    }

    // Validate Why Inspiring
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
    // Clear error when user starts typing
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
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to your backend
      // For demonstration, using setTimeout to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate API response
      const response = await mockSubmitInvitation(formData);
      
      if (response.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          industry: '',
          currentRole: '',
          whyInspiring: ''
        });
      } else {
        throw new Error(response.message || 'Failed to send invitation');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrors({
        submit: error.message || 'Failed to send invitation. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock API call - replace with your actual API endpoint
  const mockSubmitInvitation = async (data) => {
    // Simulate API validation and response
    if (!data.email.includes('@')) {
      return { success: false, message: 'Invalid email format' };
    }
    return { success: true, message: 'Invitation sent successfully' };
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Invite - Phase 1</h1>
      </header>

      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Invite Someone Inspiring</h2>
        <p className={styles.formSubtitle}>
          Know someone who could inspire others? Invite them to join!
        </p>

        {submitStatus === 'success' && (
          <div className={styles.successMessage}>
            Invitation sent successfully!
          </div>
        )}

        {errors.submit && (
          <div className={styles.errorMessage}>
            {errors.submit}
          </div>
        )}

        <h3 className={styles.sectionTitle}>Role Model's Information</h3>

        <form onSubmit={handleSubmit}>
          {/* ... existing form fields ... */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Their Full Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <span className={styles.errorText}>{errors.fullName}</span>
            )}
          </div>

          {/* ... other form fields with similar error handling ... */}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Invitation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvitePage;

//SP: some information about testing endpoints and mocking responses is included in this bit of jsx - take it with a grain of salt

