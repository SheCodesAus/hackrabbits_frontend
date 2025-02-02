import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GeneralUserProfileDetails = ({ communityuserId }) => {
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    // Fetch profile data based on authentication status
    const fetchData = async () => {
      try {
        const url = isAuthenticated
          ? `${import.meta.env.VITE_API_URL}/community-user/profile/${communityuserId}`
          : `${import.meta.env.VITE_API_URL}/community-user/public-profile/${communityuserId}`;

        const response = await fetch(url, {
          headers: token ? {
            'Authorization': `Bearer ${token}`
          } : {}
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [communityuserId, isAuthenticated]);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="profile-details">
      {profile.image && (
        <div className="profile-image">
          <img src={profile.image} alt="Profile" className="rounded-full w-32 h-32 object-cover" />
        </div>
      )}
      
      <div className="basic-info">
        <h2 className="text-2xl font-bold mb-4">
          {profile.first_name} {profile.last_name}
        </h2>
        <p className="mb-2"><strong>Current Role:</strong> {profile.current_role}</p>
        <p className="mb-2"><strong>Industry:</strong> {profile.industry?.replace('_', ' ')}</p>
        <p className="mb-2"><strong>Location:</strong> {profile.location}</p>
      </div>

      {isAuthenticated ? (
        <div className="detailed-info mt-6">
          <div className="contact-info mb-4">
            <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
            <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
            {profile.phone_number && (
              <p className="mb-2"><strong>Phone:</strong> {profile.phone_number}</p>
            )}
            {profile.linkedin && (
              <p className="mb-2">
                <strong>LinkedIn:</strong>{' '}
                <a 
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Profile
                </a>
              </p>
            )}
          </div>

          <div className="professional-info">
            <h3 className="text-xl font-semibold mb-2">Professional Information</h3>
            {profile.skills && profile.skills.length > 0 && (
              <p className="mb-2"><strong>Skills:</strong> {profile.skills.join(', ')}</p>
            )}
            {profile.interests && profile.interests.length > 0 && (
              <p className="mb-2"><strong>Interests:</strong> {profile.interests.join(', ')}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Login to View Full Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default GeneralUserProfileDetails;