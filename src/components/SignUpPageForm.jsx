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
     achievements: ''
   }
 });

 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null);
 const [successMessage, setSuccessMessage] = useState('');

 const validateForm = () => {
   const errors = {};

   if (!formData.fullName.trim()) {
     errors.fullName = 'Full name is required';
   }

   if (!formData.email.trim()) {
     errors.email = 'Email is required';
   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
     errors.email = 'Invalid email format';
   }

   if (!formData.password.trim()) {
     errors.password = 'Password is required';
   } else if (formData.password.length < 8) {
     errors.password = 'Password must be at least 8 characters';
   }

   if (!formData.industry.trim()) {
     errors.industry = 'Industry is required';
   }

   if (!formData.location.trim()) {
     errors.location = 'Location is required';
   }

   if (formData.userType === 'roleModel') {
     if (!formData.roleModel.currentRole.trim()) {
       errors.currentRole = 'Current role is required';
     }
     if (!formData.roleModel.organization.trim()) {
       errors.organization = 'Organization is required';
     }
     if (!formData.roleModel.linkedinUrl.trim()) {
       errors.linkedinUrl = 'LinkedIn URL is required';
     }
     if (!formData.roleModel.achievements.trim()) {
       errors.achievements = 'Achievements are required';
     }
   }

   return errors;
 };

 const handleChange = (e) => {
   const { name, value, type, checked } = e.target;
   if (name.includes('roleModel.')) {
     const roleModelField = name.split('.')[1];
     setFormData(prev => ({
       ...prev,
       roleModel: {
         ...prev.roleModel,
         [roleModelField]: value
       }
     }));
   } else {
     setFormData(prev => ({
       ...prev,
       [name]: type === 'checkbox' ? checked : value,
       ...(name === 'userType' && {
         roleModel: {
           currentRole: '',
           organization: '',
           linkedinUrl: '',
           achievements: ''
         }
       })
     }));
   }
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError(null);
   setSuccessMessage('');

   const validationErrors = validateForm();
   if (Object.keys(validationErrors).length > 0) {
     setError(validationErrors);
     return;
   }

   setIsLoading(true);

   try {
     const response = await fetch('/api/signup', {
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

     setSuccessMessage('Account created successfully!');
     setFormData({
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
         achievements: ''
       }
     });
   } catch (err) {
     setError(err.message);
   } finally {
     setIsLoading(false);
   }
 };

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
           <label htmlFor="userType" className="form-label">Subject *</label>
           <select
             id="userType"
             name="userType"
             value={formData.userType}
             onChange={handleChange}
             required
             className="form-input"
             disabled={isLoading}
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
             className={`form-input ${error?.fullName ? 'error' : ''}`}
             disabled={isLoading}
           />
           {error?.fullName && <span className="error-text">{error.fullName}</span>}
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
             className={`form-input ${error?.industry ? 'error' : ''}`}
             disabled={isLoading}
           />
           {error?.industry && <span className="error-text">{error.industry}</span>}
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
             className={`form-input ${error?.location ? 'error' : ''}`}
             disabled={isLoading}
           />
           {error?.location && <span className="error-text">{error.location}</span>}
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
                 className={`form-input ${error?.currentRole ? 'error' : ''}`}
                 disabled={isLoading}
               />
               {error?.currentRole && <span className="error-text">{error.currentRole}</span>}
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
                 className={`form-input ${error?.organization ? 'error' : ''}`}
                 disabled={isLoading}
               />
               {error?.organization && <span className="error-text">{error.organization}</span>}
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
                 className={`form-input ${error?.linkedinUrl ? 'error' : ''}`}
                 disabled={isLoading}
               />
               {error?.linkedinUrl && <span className="error-text">{error.linkedinUrl}</span>}
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
                 className={`form-input ${error?.achievements ? 'error' : ''}`}
                 disabled={isLoading}
               />
               {error?.achievements && <span className="error-text">{error.achievements}</span>}
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
             disabled={isLoading}
           />
           <label htmlFor="agreeToTerms" className="form-label">
             I agree to the Terms of Service and Privacy Policy
           </label>
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
         <a href="#" className="log-in">
           Log In
         </a>
       </div>
     </div>
   </div>
 );
};

export default SignupForm;

/**
* @author SP
* Changes added to original version:
* - Added async form submission with loading states
* - Added form validation for all fields
* - Added error handling and display
* - Added success message handling
* - Added disabled states while submitting
* - Added field-level error messages
* - Added password length validation (min 8 chars)
* - Added email format validation
*/