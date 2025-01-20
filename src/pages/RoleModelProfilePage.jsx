import React, { useState } from 'react';
import './RoleModelProfile.css';

const RoleModelProfile = () => {
  const [contactFormData, setContactFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    requestType: 'Coaching Session',
    preferredContactMethod: 'email',
    preferredMeetingDate: '',
    message: '',
    attachments: null,
  });

  const handleContactFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setContactFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    console.log(contactFormData);
    // Add your contact form submission logic here
  };

  return (
    <div className="role-model-profile">
      <div className="profile-header">
        <div className="profile-image">
          {/* Profile image placeholder */}
          <img src="/api/placeholder/200/200" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">Maya Rodriguez</h2>
          <p className="profile-title">Tech Innovator & Social Entrepreneur</p>
          <p className="profile-role">Current Role: Senior Product Manager</p>
          <p className="profile-organization">Organisation: Global Tech Solutions</p>
          <button className="hide-details-button">Hide Contact Details</button>
        </div>
      </div>

      <div className="profile-details">
        {/* Existing profile details */}
        <div className="profile-actions">
          <button className="like-button">Like (12)</button>
          <button className="follow-button">Follow</button>
          <button className="contact-button" onClick={() => setContactFormData((prevState) => ({ ...prevState, fullName: '', email: '', phoneNumber: '' }))}>
            Contact Role Model
          </button>
        </div>
      </div>

      {/* Contact Role Model Form */}
      <div className="contact-form-container">
        <h3 className="section-title">Contact Role Model</h3>
        <p>Send a message to connect</p>
        <form onSubmit={handleContactFormSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Your Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={contactFormData.fullName}
              onChange={handleContactFormChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Your Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactFormData.email}
              onChange={handleContactFormChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={contactFormData.phoneNumber}
              onChange={handleContactFormChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="requestType" className="form-label">Request Type *</label>
            <select
              id="requestType"
              name="requestType"
              value={contactFormData.requestType}
              onChange={handleContactFormChange}
              required
              className="form-input"
            >
              <option value="Coaching Session">Coaching Session</option>
              <option value="Conference Request">Conference Request</option>
              <option value="Custom Request">Custom Request</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="preferredContactMethod" className="form-label">Preferred Contact Method</label>
            <select
              id="preferredContactMethod"
              name="preferredContactMethod"
              value={contactFormData.preferredContactMethod}
              onChange={handleContactFormChange}
              className="form-input"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="preferredMeetingDate" className="form-label">Preferred Meeting Date (if applicable)</label>
            <input
              type="date"
              id="preferredMeetingDate"
              name="preferredMeetingDate"
              value={contactFormData.preferredMeetingDate}
              onChange={handleContactFormChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message *</label>
            <textarea
              id="message"
              name="message"
              value={contactFormData.message}
              onChange={handleContactFormChange}
              required
              rows={4}
              className="form-input"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="attachments" className="form-label">Attachments (if any)</label>
            <input
              type="file"
              id="attachments"
              name="attachments"
              onChange={handleContactFormChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoleModelProfile;