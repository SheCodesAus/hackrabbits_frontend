import React from 'react';
import PropTypes from 'prop-types';

//Role model details 

const ProfileDetails = ({
    name,
    profession,
    bio,
    achievements,
    skillSet,
    inspiration,
    linkedinUrl,
    age,
    currentRole,
    organization,
    milestones,
    onContact,
}) => {
    return (
        <div className="profile-details">
            <div className="profile-header">
                <div className="profile-image">
                    <img src="/api/placeholder/200/200" alt="Profile" />
                </div>
                <div className="profile-info">
                    <h2>{name}</h2>
                    <p>{profession}</p>
                    <p>Current Role: {currentRole}</p>
                    <p>Organization: {organization}</p>
                    <p>Age: {age}</p>
                    <button className="hide-details-button">Hide Contact Details</button>
                </div>
            </div>
            <div className="profile-bio">
                <p>{bio}</p>
            </div>
            <div className="profile-achievements">
                <h3>Key Achievements</h3>
                <ul>
                    {achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    ))}
                </ul>
            </div>
            <div className="profile-skills">
                <h3>Skill Set</h3>
                <ul>
                    {skillSet.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>
            <div className="profile-inspiration">
                <h3>My Inspiration</h3>
                <p>{inspiration}</p>
            </div>
            <div className="profile-links">
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    Connect on LinkedIn
                </a>
            </div>
            <div className="profile-milestones">
                <h3>Interactive Achievement Timeline</h3>
                {milestones.map((milestone, index) => (
                    <div key={index} className="milestone-item">
                        <div className="milestone-year">{milestone.year}</div>
                        <div className="milestone-details">{milestone.details}</div>
                    </div>
                ))}
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
    profession: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
    skillSet: PropTypes.arrayOf(PropTypes.string).isRequired,
    inspiration: PropTypes.string.isRequired,
    linkedinUrl: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    currentRole: PropTypes.string.isRequired,
    organization: PropTypes.string.isRequired,
    milestones: PropTypes.arrayOf(
        PropTypes.shape({
            year: PropTypes.number.isRequired,
            details: PropTypes.string.isRequired,
        })
    ).isRequired,
    onContact: PropTypes.func.isRequired,
};

export default ProfileDetails;