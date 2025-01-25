// src/components/ErrorMessage.jsx
import React from 'react';
import { Sparkles, Star, RotateCcw, Home } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import './ErrorMessage.css';

const ErrorMessage = () => {
  const navigate = useNavigate();
  
  const encouragements = [
    "Every challenge is an opportunity!",
    "Success is just around the corner!",
    "Let's break through this barrier together!",
    "Tech pioneers face obstacles too!",
    "Time for some problem-solving magic!"
  ];

  return (
    <div className="error-overlay">
      <div className="error-container">
        <div className="error-header">
          <Sparkles className="icon sparkle" />
          <h2 className="error-title">Oops! A Small Setback</h2>
          <Star className="icon star" />
        </div>
        
        <div className="error-content">
          <p className="error-message">
            Even tech has its moments! Let's try that again.
          </p>
          <p className="encouragement">
            {encouragements[Math.floor(Math.random() * encouragements.length)]} ✨
          </p>
          
          <div className="button-container">
            <button 
              onClick={() => window.location.reload()} 
              className="button refresh-button"
            >
              <RotateCcw className="button-icon" />
              Refresh Page
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="button home-button"
            >
              <Home className="button-icon" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;