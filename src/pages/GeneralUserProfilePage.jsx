import React, { useState } from 'react';
import './GeneralUserProfile.css';

const GeneralUserProfile = () => {
  const [formData, setFormData] = useState({
    profilePhoto: '',
    fullName: '',
    phoneNumber: '',
    industry: '',
    occupation: '',
    linkedinUrl: '',
    city: '',
    email: '',
    preferredCommunicationMethod: 'email'
  });

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Business',
    'Arts & Entertainment',
    'Other'
  ];

  const communicationMethods = [
    'Email',
    'Phone',
    'LinkedIn'
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div className="general-user-profile-form">
      <div className="profile-form-container">
        <h2 className="form-title">Create Your Profile</h2>
        <p className="form-subtitle">Phase 1: Basic Profile</p>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="profilePhoto" className="form-label">Profile Photo</label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              onChange={handleChange}
              className="form-input"
            />
            <button type="button" className="upload-button">Upload</button>
          </div>

          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">Phone Number (+61)</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="industry" className="form-label">Industry</label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select an industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="occupation" className="form-label">Occupation</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedinUrl" className="form-label">LinkedIn Profile URL</label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="preferredCommunicationMethod" className="form-label">Preferred Communication Method</label>
            <div className="communication-methods">
              {communicationMethods.map((method) => (
                <div key={method} className="communication-method">
                  <input
                    type="radio"
                    id={`communication-method-${method.toLowerCase()}`}
                    name="preferredCommunicationMethod"
                    value={method.toLowerCase()}
                    checked={formData.preferredCommunicationMethod === method.toLowerCase()}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <label htmlFor={`communication-method-${method.toLowerCase()}`} className="form-label">
                    {method}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneralUserProfile;