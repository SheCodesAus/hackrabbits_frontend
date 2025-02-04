import React, { useEffect, useState } from "react";
import fetchLimitedRoleModelProfile from "../api/rolemodeluser_profile/get_publicview_profile";
import fetchRolemodel from "../api/rolemodeluser_profile/get_fulldetailsprofile";
import { useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm";

// // BS. I need to get id using the useparam and hook now I wonder if it's matter to get the id from which endpoint? I don't think so!

// // BS. in role model profile, i need to check if it's auth user show full details profile, if not show public view with button learn more.

// // to get user details fetch logic for auth point to full detail for public point to public view

// // BS.  Toggle function for contact form

// // BS. toggle for edit form:     const toggleEditForm = () => setShowEditForm((prev) => !prev);

// // BS. Delete project handler
// // const handleDelete = async () => {
// //   if (confirm("Are you sure you want to delete this project?")) {
// //       try {
// //           await deleteProject(projectId);
// //           alert("Project deleted successfully!");
// //           window.location.href = "/";
// //       } catch (err) {
// //           setDeleteError(err.message);
// //       }
// //   }
// // };

const RoleModelProfileDetails = ({ rolemodelId, name }) => {
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);

  const handleContactRequest = () => {
    setShowContactForm(!showContactForm);
  };

  const handleContactSubmitted = () => {
    setShowContactForm(false); // Hide the form after submission
  };


  const formatText = (text) => {
    if (!text) return "";
    return text
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const token = localStorage.getItem("token");
      const authStatus = !!token;
      setIsAuthenticated(authStatus);

      try {
        const data = authStatus
          ? await fetchRolemodel(rolemodelId)
          : await fetchLimitedRoleModelProfile(rolemodelId);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [rolemodelId]);



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
              {/* <p className="profile-info"><strong>Organisation:</strong> {profile.organization} </p> */}
              <p className="profile-info"><strong>Location:</strong> {formatText(profile.location)}</p>

            </div>

          </div>
        </div>
      </div>


      {isAuthenticated ? (
        <>
          {/* Inspiration Section */}
          <div className="profile-card">
            <h3 className="section-header">Inspiration</h3>
            <p>{profile.inspiration}</p>
          </div>
          {/* Advice Section */}
          <div className="profile-card">
            <h3 className="section-header">Advice</h3>
            <p>{profile.advice}</p>
          </div>

          {/* Achievements Section */}
          <div className="profile-card">
            <h3 className="section-header">Achievements</h3>
            <p>{profile.achievements}</p>
          </div>

          {/* LinkedIn Section */}
          <div className="profile-card">
            <button
              className="action-button"
              onClick={() => window.open(profile.linkedin)}
            >
              Connect on LinkedIn
            </button>


            {/* Contact Section */}
            <button onClick={handleContactRequest} className="action-button">
              Contact
            </button>
            {showContactForm && (
              <>
                <ContactForm recipientEmail={profile.email} onContactSubmitted={handleContactSubmitted} />
                <button onClick={handleContactRequest} className="action-button">
                  Cancel
                </button>
              </>
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
      )}
    </div>
  );
};

export default RoleModelProfileDetails;
