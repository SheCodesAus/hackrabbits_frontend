import React from 'react';
import PropTypes from 'prop-types';

//Role Model profile details

const ProfileDetails = ({ name, title, role, organization, onContact }) => {
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
                    <button className="hide-details-button">Hide Contact Details</button>
                </div>
            </div>
            <div className="profile-actions">
                <button className="like-button">Like</button>
                <button className="follow-button">Follow</button>
                <button className="contact-button" onClick={onContact}>
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
    onContact: PropTypes.func.isRequired,
};

export default ProfileDetails;
