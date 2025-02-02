import React from 'react';

const ProfileDisplay = ({ data, onEdit }) => {
  if (!data) return <div>Loading profile...</div>;

  return (
    <div className="profile-display">
      <div className="profile-header">
        <h2>{data.first_name} {data.last_name}</h2>
        <button onClick={onEdit} className="edit-button">Edit Profile</button>
      </div>
      <div className="profile-info">
        <div className="info-group">
          <label>Email:</label>
          <p>{data.email}</p>
        </div>
        <div className="info-group">
          <label>Location:</label>
          <p>{data.location}</p>
        </div>
        <div className="info-group">
          <label>Industry:</label>
          <p>{data.industry}</p>
        </div>
        <div className="info-group">
          <label>Current Role:</label>
          <p>{data.current_role}</p>
        </div>
        <div className="info-group">
          <label>LinkedIn:</label>
          <p>{data.linkedin || 'Not provided'}</p>
        </div>
        <div className="info-group">
          <label>Phone Number:</label>
          <p>{data.phone_number || 'Not provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;