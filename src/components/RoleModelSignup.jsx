// RoleModelSignup.jsx
import React, { useState } from 'react';
import styles from './RoleModelSignup.css';

const RoleModelSignup = () => {
 const [formData, setFormData] = useState({
   fullName: '',
   email: '',
   password: '',
   industry: '',
   location: '',
   currentRole: '',
   organization: '',
   linkedinUrl: '', 
   achievements: '',
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
   if (!formData.currentRole) errors.currentRole = 'Current role required';
   if (!formData.organization) errors.organization = 'Organization required';
   if (!formData.linkedinUrl) errors.linkedinUrl = 'LinkedIn URL required';
   if (!formData.achievements) errors.achievements = 'Achievements required';
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
     const response = await fetch('/api/rolemodel-signup', {
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
       currentRole: '',
       organization: '',
       linkedinUrl: '',
       achievements: '',
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
       <h1 className={styles.title}>Role Model Sign Up</h1>
       
       {success && <div className={styles.successMessage}>{success}</div>}
       {error?.submit && <div className={styles.errorMessage}>{error.submit}</div>}

       <form onSubmit={handleSubmit}>
         {/* Basic fields same as CommunityUserSignup */}
         
         <div className={styles.formGroup}>
           <label className={styles.label}>
             Current Role <span className={styles.required}>*</span>
           </label>
           <input
             type="text"
             name="currentRole"
             value={formData.currentRole}
             onChange={handleChange}
             className={`${styles.input} ${error?.currentRole ? styles.inputError : ''}`}
             disabled={isLoading}
             required
           />
           {error?.currentRole && <span className={styles.errorText}>{error.currentRole}</span>}
         </div>

         <div className={styles.formGroup}>
           <label className={styles.label}>
             Organization <span className={styles.required}>*</span>
           </label>
           <input
             type="text"  
             name="organization"
             value={formData.organization}
             onChange={handleChange}
             className={`${styles.input} ${error?.organization ? styles.inputError : ''}`}
             disabled={isLoading}
             required
           />
           {error?.organization && <span className={styles.errorText}>{error.organization}</span>}
         </div>

         <div className={styles.formGroup}>
           <label className={styles.label}>
             LinkedIn URL <span className={styles.required}>*</span>
           </label>
           <input
             type="url"
             name="linkedinUrl"
             value={formData.linkedinUrl}
             onChange={handleChange}
             className={`${styles.input} ${error?.linkedinUrl ? styles.inputError : ''}`}
             disabled={isLoading}
             required
           />
           {error?.linkedinUrl && <span className={styles.errorText}>{error.linkedinUrl}</span>}
         </div>

         <div className={styles.formGroup}>
           <label className={styles.label}>
             Achievements <span className={styles.required}>*</span>
           </label>
           <textarea
             name="achievements"  
             value={formData.achievements}
             onChange={handleChange}
             className={`${styles.input} ${error?.achievements ? styles.inputError : ''}`}
             disabled={isLoading}
             required
             rows={4}
           />
           {error?.achievements && <span className={styles.errorText}>{error.achievements}</span>}
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

export default RoleModelSignup;

/**
* @author SP
* Changes made:
* - Split into separate components for community/role model signup
* - Added async form submission with loading states
* - Added form validation for all fields
* - Added error handling and display
* - Added success message handling
* - Added disabled states during submission
* - Added field-level error messages
* - Added password validation (min 8 chars)
* - Added required field validation
* - Role model specific fields and validation
*/