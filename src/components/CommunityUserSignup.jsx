// CommunityUserSignup.jsx
import React, { useState } from 'react';
import styles from './Signup.module.css';

const CommunityUserSignup = () => {
 const [formData, setFormData] = useState({
   fullName: '',
   email: '',
   password: '',
   industry: '',
   location: '',
   agreeToTerms: false
 });

 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null);
 const [success, setSuccess] = useState('');

 const validateForm = () => {
   const errors = {};
   if (!formData.fullName) errors.fullName = 'Name required';
   if (!formData.email) errors.email = 'Email required';
   if (!formData.password || formData.password.length < 8) {
     errors.password = 'Password must be at least 8 characters';
   }
   if (!formData.industry) errors.industry = 'Industry required';
   if (!formData.location) errors.location = 'Location required';
   return errors;
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError(null);
   setSuccess('');

   const validationErrors = validateForm();
   if (Object.keys(validationErrors).length > 0) {
     setError(validationErrors);
     return;
   }

   setIsLoading(true);
   try {
     const response = await fetch('/api/community-signup', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData)
     });

     const data = await response.json();

     if (!response.ok) {
       throw new Error(data.message || 'Signup failed');
     }

     setSuccess('Account created successfully!');
     setFormData({
       fullName: '',
       email: '',
       password: '',
       industry: '',
       location: '',
       agreeToTerms: false
     });

   } catch (err) {
     setError({submit: err.message});
   } finally {
     setIsLoading(false);
   }
 };

 const handleChange = (e) => {
   const { name, value, type, checked } = e.target;
   setFormData(prev => ({
     ...prev,
     [name]: type === 'checkbox' ? checked : value
   }));
 };

 return (
   <div className={styles.signupForm}>
     <div className={styles.container}>
       <h1 className={styles.title}>Community User Sign Up</h1>
       
       {success && <div className={styles.successMessage}>{success}</div>}
       {error?.submit && <div className={styles.errorMessage}>{error.submit}</div>}

       <form onSubmit={handleSubmit}>
         <div className={styles.formGroup}>
           <label className={styles.label}>
             Full Name <span className={styles.required}>*</span>
           </label>
           <input
             type="text"
             name="fullName"
             value={formData.fullName}
             onChange={handleChange}
             className={`${styles.input} ${error?.fullName ? styles.inputError : ''}`}
             disabled={isLoading}
             required
           />
           {error?.fullName && <span className={styles.errorText}>{error.fullName}</span>}
         </div>

         <div className={styles.formGroup}>
           <label className={styles.label}>
             Email <span className={styles.required}>*</span>
           </label>
           <input
             type="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             className={`${styles.input} ${error?.email ? styles.inputError : ''}`}
             disabled={isLoading}
             required
           />
           {error?.email && <span className={styles.errorText}>{error.email}</span>}
         </div>

         <div className={styles.formGroup}>
           <label className={styles.label}>
             Password <span className={styles.required}>*</span>
           </label>
           <input
             type="password"
             name="password"
             value={formData.password}
             onChange={handleChange}
             className={`${styles.input} ${error?.password ? styles.inputError : ''}`}
             disabled={isLoading}
             required
           />
           {error?.password && <span className={styles.errorText}>{error.password}</span>}
         </div>

         <div className={styles.formGroup}>
           <label className={styles.label}>
             Industry <span className={styles.required}>*</span>
           </label>
           <input
             type="text"
             name="industry"
             value={formData.industry}
             onChange={handleChange}
             className={`${styles.input} ${error?.industry ? styles.inputError : ''}`}
             disabled={isLoading}
             required
           />
           {error?.industry && <span className={styles.errorText}>{error.industry}</span>}
         </div>

         <div className={styles.formGroup}>
           <label className={styles.label}>
             Location <span className={styles.required}>*</span>
           </label>
           <input
             type="text"
             name="location"
             value={formData.location}
             onChange={handleChange}
             className={`${styles.input} ${error?.location ? styles.inputError : ''}`}
             disabled={isLoading}
             required
           />
           {error?.location && <span className={styles.errorText}>{error.location}</span>}
         </div>

         <div className={styles.checkboxGroup}>
           <input
             type="checkbox"
             name="agreeToTerms"
             checked={formData.agreeToTerms}
             onChange={handleChange}
             disabled={isLoading}
             required
           />
           <label>I agree to Terms and Conditions</label>
         </div>

         <button 
           type="submit" 
           className={styles.submitButton}
           disabled={isLoading}
         >
           {isLoading ? 'Creating Account...' : 'Create Account'}
         </button>
       </form>
     </div>
   </div>
 );
};

export default CommunityUserSignup;

/**
 * @author SP
 * Added functionality:
 * - Form state management with useState
 * - Form validation for all required fields
 * - Async form submission with loading states
 * - Success/error message handling
 * - Input field error display
 * - Password strength validation
 * - Terms agreement requirement
 * - Form reset after submission
 */