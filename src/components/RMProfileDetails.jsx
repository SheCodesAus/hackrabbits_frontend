import React, { useEffect, useState } from "react";
import fetchLimitedRoleModelProfile from "../api/rolemodeluser_profile/get_publicview_profile";
import fetchRolemodel from "../api/rolemodeluser_profile/get_fulldetailsprofile";
import { useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm";

// BS. I need to get id using the useparam and hook now I wonder if it's matter to get the id from which endpoint? I don't think so! 

// BS. in role model profile, i need to check if it's auth user show full details profile, if not show public view with button learn more.

// to get user details fetch logic for auth point to full detail for public point to public view 

// BS.  Toggle function for contact form

// BS. toggle for edit form:     const toggleEditForm = () => setShowEditForm((prev) => !prev);

// BS. Delete project handler 
// const handleDelete = async () => {
//   if (confirm("Are you sure you want to delete this project?")) {
//       try {
//           await deleteProject(projectId);
//           alert("Project deleted successfully!");
//           window.location.href = "/";
//       } catch (err) {
//           setDeleteError(err.message);
//       }
//   }
// };



const RoleModelProfileDetails = ({ rolemodelId }) => {
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);

  // toggle for contact form 
  const handleContactRequest = () => {
    setShowContactForm(!showContactForm);
  };

  // Toggle for Contact Form
  // const handleContactRequest = () => {
  //   setShowContactForm((prev) => !prev);
  // };

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
    <div className="profile-details">
      <img src={profile.image} alt="profile photo" />
      {/* <h2>{profile.first_name} {profile.last_name}</h2> */}
      <p><strong>Role:</strong> {profile.current_role}</p>
      <p><strong>Industry:</strong> {profile.industry}</p>
      <p><strong>Location:</strong> {profile.location}</p>


      {isAuthenticated ? (
        <>
          <p><strong>Skills:</strong> {profile.skills?.join(", ")}</p>
          <p><strong>Categories:</strong> {profile.categories?.join(", ")}</p>
          <h3>Milestones</h3>
          <p>{profile.milestones || " "}</p>

          <h3>Achievements</h3>
          <p>{profile.achievements || " "}</p>

          <h3>Advice</h3>
          <p>{profile.advice || " "}</p>

          {/* Contact Form */}
          <button onClick={handleContactRequest} className="button">
            Contact
          </button>

          {/* I am tryin to implement a contact form button happen.
               set up a toggle and the button here. 
               but not sure how to handle when i call contact form. 
               this pieace of code is borrowed from my other project  */}

          {/* Contact Form */}
          {showContactForm && (
            <div className="contact-form-container">
              <ContactForm onContactSubmitted={refetch} />
              <button onClick={handleContactRequest} className="button">
                Cancel
              </button>
            </div>
          )}
          {/* need to pass onContactSubmitted to contact form */}
        </>
      ) : (
        <button onClick={() => navigate("/login")}>
          {/* hook to save the profile page so after login we come back to the same page */}
          Learn More
        </button>)
      }
    </div>
  )
}


export default RoleModelProfileDetails;