import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/use-auth.js';
import { loginUser } from '../api/auth-service';
import { validateLoginForm } from '../utils/validation-utils';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
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
    setIsLoading(true);
    setErrors({});

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const data = await loginUser(formData);
      // Update auth context with token
      setAuth({ token: data.token });
      // Store token in localStorage
      window.localStorage.setItem('token', data.token);

      // const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";

      // if (redirectPath && redirectPath.startsWith("/role-model-profile")) {
      //   navigate(redirectPath); // If coming from profile, go back there
      // } else {
      //   navigate("/"); // Otherwise, go to home
      // }


      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin"); // Clear after use
      navigate(redirectPath);



      localStorage.removeItem("redirectAfterLogin");


    } catch (err) {
      setErrors({
        general: err.message || 'Login failed. Please check your credentials and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-container">
        <h2>Welcome Back</h2>

        {errors.general && (
          <div className="general-error">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-input ${errors.username ? 'input-error' : ''}`}
              disabled={isLoading}
              required
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              disabled={isLoading}
              required
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="login-links">
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="signup-link">
          Don't have an account?
          <a href="/signup" className="sign-up">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;