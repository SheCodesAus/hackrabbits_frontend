// RoleModelProfile.js
import React from 'react';
import ProfileDetails from '../components/RMProfileDetails';
import ContactForm from './ContactForm';
import './RoleModelProfile.css';

const RoleModelProfile = () => {
  const handleFormSubmit = (formData) => {
    console.log('Contact Form Submitted:', formData);
  };

  return (
    <div className="role-model-profile-page">
      <ProfileDetails
        name="Maya Rodriguez"
        title="Tech Innovator & Social Entrepreneur"
        role="Senior Product Manager"
        organization="Global Tech Solutions"
        onContact={() => console.log('Contact button clicked')}
      />
      <ContactForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default RoleModelProfile;
