import React, { useState } from 'react';
import styles from './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Here you would typically make an API call to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle successful login
      console.log('Login successful');
      
      // You might want to redirect user or update app state here
      
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({
        general: 'Login failed. Please try again.'
      });
    }
  };

  // Handle forgot password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('Forgot password clicked');
    // Add your forgot password logic here
  };

  // Handle signup link
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign up clicked');
    // Add your signup navigation logic here
  };

  return (
    <div className={styles.loginFormPhase1}>
      <div className={styles.loginContainer}>
        <h2>Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.inputError : ''}
              required
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.inputError : ''}
              required
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Login
          </button>

          <a 
            href="#" 
            className={styles.forgotPassword}
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </a>
        </form>

        <div className={styles.signupLink}>
          Don't have an account?
          <a 
            href="#" 
            className={styles.signUp}
            onClick={handleSignUp}
          >
            Sign Up
          </a>
        </div>

        {errors.general && (
          <div className={styles.generalError}>
            {errors.general}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;