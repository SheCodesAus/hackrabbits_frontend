import React from 'react';
import PropTypes from 'prop-types';

const ProfileDetails = ({ name, title, role, organization, email, phone, onContact, onContactRoleModel }) => {
  return (
    <div className="profile-details">
      <div className="profile-header">
        <div className="profile-image">
          <img src="/api/placeholder/200/200" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>{name}</h2>
          <p>{title}</p>
          <p>Current Role: {role}</p>
          <p>Organization: {organization}</p>
          <div className="contact-info">
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
          </div>
          <button className="hide-details-button">Hide Contact Details</button>
        </div>
      </div>
      <div className="profile-actions">
        <button className="like-button">Like</button>
        <button className="follow-button">Follow</button>
        <button className="contact-button" onClick={onContact}>
          Contact
        </button>
        <button className="contact-role-model-button" onClick={onContactRoleModel}>
          Contact Role Model
        </button>
      </div>
    </div>
  );
};

ProfileDetails.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onContact: PropTypes.func.isRequired,
  onContactRoleModel: PropTypes.func.isRequired,
};

export default ProfileDetails;

//SP:added the contact RM button option, proptypes 