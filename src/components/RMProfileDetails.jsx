import React, { useEffect, useState } from "react";
import fetchLimitedRoleModelProfile from "../api/rolemodeluser_profile/get_publicview_profile";
import fetchRolemodel from "../api/rolemodeluser_profile/get_fulldetailsprofile";
import { useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm";
import deleteProfile from "../api/rolemodeluser_profile/delete_profile";
// // BS. I need to get id using the useparam and hook now I wonder if it's matter to get the id from which endpoint? I don't think so!

// // BS. in role model profile, i need to check if it's auth user show full details profile, if not show public view with button learn more.

// // to get user details fetch logic for auth point to full detail for public point to public view

// // BS.  Toggle function for contact form

// // BS. toggle for edit form:     const toggleEditForm = () => setShowEditForm((prev) => !prev);



const RoleModelProfileDetails = ({ rolemodelId, name }) => {
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const formatText = (text) => {
    if (!text) return "";
    return text
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleContactRequest = () => {
    setShowContactForm(!showContactForm);
  };

  const handleContactSubmitted = () => {
    setShowContactForm(false); // Hide the form after submission
  };

  // BS. Delete profile handler
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this profile?")) {
      try {
        await deleteProfile(rolemodelId);
        alert("Profile deleted successfully!");
        window.location.href = "/";
      } catch (err) {
        setDeleteError(err.message);
      }
    }
  };


  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    // Fetch profile data from the correct endpoint for public or registered user
    const fetchData = async () => {
      try {
        const data = isAuthenticated
          ? await fetchRolemodel(rolemodelId)
          : await fetchLimitedRoleModelProfile(rolemodelId);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rolemodelId, isAuthenticated]);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found.</p>;


  return (
    <div className="profile-content">
      {/* Profile Info Card */}
      <div className="profile-card">
        <div className="profile-info">
          <div className="profile-image">
            <img src={profile.image} alt="Profile Photo" />
          </div>
          <div className="profile-details">
            <h2 className="profile-name">{name}</h2>
            <div className="profile-data">
              <p className="profile-info"><strong>Role:</strong> {profile.current_role}</p>
              <p className="profile-info"><strong>Industry:</strong> {formatText(profile.industry)}</p>
              <p className="profile-info"><strong>Organisation:</strong> {profile.organization} </p>
              <p className="profile-info"><strong>Location:</strong> {formatText(profile.location)}</p>

            </div>

          </div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="profile-card">
        <h3 className="section-header">Inspiration</h3>
        <p>{profile.journey || ""}</p>
      </div>

      {/* Skills Section */}
      <div className="profile-card">
        <h3 className="section-header">Skill Set</h3>
        <ul className="skills-list">
          {profile.skills ? profile.skills.map((skill, index) => <li key={index}>{skill}</li>) : (
            <>
              {/* <li>Product Management</li> */}
              {/* <li>Strategic Innovation</li>
              <li>Tech Entrepreneurship</li>
              <li>Agile Methodologies</li> */}
            </>
          )}
        </ul>
      </div>

      {/* Inspiration Section */}
      <div className="profile-card">
        <h3 className="section-header">My Inspiration</h3>
        <p>{profile.inspiration || "No inspiration added yet. Click edit to add your inspiration!"}</p>
      </div>

      {isAuthenticated ? (
        <>

          {/* Advice Section */}
          <div className="profile-card">
            <h3 className="section-header">Advice</h3>
            <p>{profile.advice || "No advice added yet. Click edit to add your advice!"}</p>
          </div>

          {/* Achievements Section */}
          <div className="profile-card">
            <h3 className="section-header">Achievements</h3>
            <p>{profile.achievements || "No achievements added yet. Click edit to add your achievments!"}</p>
          </div>

          {/* LinkedIn Section */}
          <div className="profile-card">
            <button
              className="action-button"
              onClick={() => window.open(profile.linkedin_url || "https://linkedin.com", "_blank")}
            >
              Connect on LinkedIn
            </button>


            {/* Contact Section */}
            <button onClick={handleContactRequest} className="action-button">
              Contact
            </button>
            {showContactForm && (
              <div className="button-container">
                <ContactForm recipientEmail={profile.email || ""} onContactSubmitted={handleContactSubmitted} />
                <button onClick={handleContactRequest} className="action-button">
                  Cancel
                </button>


                <button onClick={handleDelete} className="action-button">Delete</button>
                {deleteError && <p className="error-message">{deleteError}</p>}
              </div>


            )}
          </div>
        </>
      ) : (
        <div className="profile-card">
          <button
            className="action-button"
            onClick={() => {
              localStorage.setItem("redirectAfterLogin", `/profile/${rolemodelId}`);
              navigate("/login");
            }}
          >
            Learn More
          </button>
        </div>
      )
      }
    </div >
  );
};

export default RoleModelProfileDetails;
