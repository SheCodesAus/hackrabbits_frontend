// LoginForm.jsx
import React, { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = () => {
 const [formData, setFormData] = useState({
   email: '',
   password: '',
   rememberMe: false
 });

 const [errors, setErrors] = useState({});
 const [isLoading, setIsLoading] = useState(false);

 const validateForm = () => {
   const errors = {};
   if (!formData.email) {
     errors.email = 'Email is required';
   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
     errors.email = 'Please enter a valid email';
   }

   if (!formData.password) {
     errors.password = 'Password is required';
   } else if (formData.password.length < 6) {
     errors.password = 'Password must be at least 6 characters';
   }
   return errors;
 };

 const handleChange = (e) => {
   const { name, value, type, checked } = e.target;
   setFormData(prev => ({
     ...prev,
     [name]: type === 'checkbox' ? checked : value
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
   setIsLoading(true);
   setErrors({});

   const validationErrors = validateForm();
   if (Object.keys(validationErrors).length > 0) {
     setErrors(validationErrors);
     setIsLoading(false);
     return;
   }

   try {
     const response = await fetch('/api/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData)
     });

     const data = await response.json();

     if (!response.ok) {
       throw new Error(data.message || 'Login failed');
     }

     // Handle successful login
     console.log('Login successful:', data);
     
   } catch (err) {
     setErrors({
       general: err.message || 'Login failed. Please try again.'
     });
   } finally {
     setIsLoading(false);
   }
 };

 return (
   <div className={styles.loginForm}>
     <div className={styles.loginContainer}>
       <h2>Welcome Back</h2>
       
       {errors.general && (
         <div className={styles.generalError}>{errors.general}</div>
       )}

       <form onSubmit={handleSubmit}>
         <div className={styles.formGroup}>
           <label htmlFor="email">Email</label>
           <input
             type="email"
             id="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
             disabled={isLoading}
             required
           />
           {errors.email && (
             <span className={styles.errorMessage}>{errors.email}</span>
           )}
         </div>

         <div className={styles.formGroup}>
           <label htmlFor="password">Password</label>
           <input
             type="password"
             id="password"
             name="password"
             value={formData.password}
             onChange={handleChange}
             className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
             disabled={isLoading}
             required
           />
           {errors.password && (
             <span className={styles.errorMessage}>{errors.password}</span>
           )}
         </div>

         <div className={styles.checkboxGroup}>
           <input
             type="checkbox"
             id="rememberMe"
             name="rememberMe"
             checked={formData.rememberMe}
             onChange={handleChange}
             disabled={isLoading}
           />
           <label htmlFor="rememberMe">Remember me</label>
         </div>

         <button 
           type="submit"
           className={styles.submitButton}
           disabled={isLoading}
         >
           {isLoading ? 'Logging in...' : 'Login'}
         </button>

         <a href="#" className={styles.forgotPassword}>
           Forgot Password?
         </a>
       </form>

       <div className={styles.signupLink}>
         Don't have an account?
         <a href="#" className={styles.signUp}>Sign Up</a>
       </div>
     </div>
   </div>
 );
};

export default LoginForm;