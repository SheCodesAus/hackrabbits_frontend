// LoadingSpinner.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles, Star, RotateCcw, Home } from "lucide-react";
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadingMessages = [
    "Gathering inspiration...",
    "Connecting with role models...", 
    "Preparing something amazing...",
    "Creating possibilities...",
    "Loading success stories..."
  ];

  const encouragements = [
    "Every challenge is an opportunity!",
    "Success is just around the corner!",
    "Let's break through this barrier together!",
    "Tech pioneers face obstacles too!",
    "Time for some problem-solving magic!"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        // If successful, set loading false
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-container">
          <div className="spinner-box">
            <div className="spinner">
              <Sparkles className="sparkle-icon" />
            </div>
            <div className="star-container">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`star star-${i + 1}`}>✨</div>
              ))}
            </div>
          </div>
          <p className="loading-text">
            {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-overlay">
        <div className="error-container">
          <div className="error-header">
            <Sparkles className="header-icon sparkle" />
            <h2 className="error-title">Oops! A Small Setback</h2>
            <Star className="header-icon star" />
          </div>
          
          <div className="error-content">
            <p className="error-message">
              Even tech has its moments! Let's try that again.
            </p>
            <p className="encouragement">
              {encouragements[Math.floor(Math.random() * encouragements.length)]} ✨
            </p>
            
            <div className="button-group">
              <button onClick={() => window.location.reload()} 
                      className="action-button refresh">
                <RotateCcw className="button-icon" />
                Refresh
              </button>
              <button onClick={() => window.location.href = '/'} 
                      className="action-button home">
                <Home className="button-icon" />
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="content">Your content here</div>;
};

export default LoadingSpinner;