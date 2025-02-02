// import React, { useEffect, useState } from "react";
// import fetchLimitedRoleModelProfile from "../api/rolemodeluser_profile/get_publicview_profile";
// import fetchRolemodel from "../api/rolemodeluser_profile/get_fulldetailsprofile";
// import { useNavigate } from "react-router-dom";
// import ContactForm from "./ContactForm";

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

// const RoleModelProfileDetails = ({ rolemodelId, name }) => {
//   const [profile, setProfile] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [showContactForm, setShowContactForm] = useState(false);

//   // toggle for contact form 
//   const handleContactRequest = () => {
//     setShowContactForm(!showContactForm);
//   };

//   // Handle contact form submission
//   const handleContactSubmitted = () => {
//     setShowContactForm(false); // Hide the form after submission
//   };



//   useEffect(() => {
//     // Check authentication
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }

//     // Fetch profile data from the correct endpoint for public or registered user
//     const fetchData = async () => {
//       try {
//         const data = isAuthenticated
//           ? await fetchRolemodel(rolemodelId)
//           : await fetchLimitedRoleModelProfile(rolemodelId);
//         setProfile(data);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [rolemodelId, isAuthenticated]);

//   if (loading) return <p>Loading profile...</p>;
//   if (!profile) return <p>Profile not found.</p>;




//   return (


//     <>
//       <div className="profile-header">
//         <div className="profile-photo">
//           <img src={profile.image} alt="profile photo" />
//           <div className="profile-info">
//             <h1 className="profile-name">{name}</h1>
//             <p className="profile-role"><strong>Role:</strong> {profile.current_role}</p>
//             <p className="profile-location"><strong>Location:</strong> {profile.location}</p>
//           </div>
//         </div>
//       </div>






//       <div className="profile-details">
//         {/* <h2>{profile.first_name} {profile.last_name}</h2> */}
//         <p><strong>Industry:</strong> {profile.industry}</p>


//         {isAuthenticated ? (
//           <>
//             {/* <p>
//               <strong>Skills:</strong> {profile.skills?.join(", ")}
//             </p>
//              */}

//             {/* <p>
//               <strong>Categories:</strong> {profile.categories?.join(", ")}
//             </p> */}

//             {/* <div className="milestones"></div>
//             <p>Milestones</p>
//             <p>{profile.milestones || " "}</p> */}

//             <div className="Inspiration"></div>
//             <p>Inspiration</p>
//             <p>{profile.inspiration || " "}</p>


//             <div className="advice"></div>
//             <p>Advice</p>
//             <p>{profile.advice || " "}</p>

//             <div className="achievements"></div>
//             <p>Achievements</p>
//             <p>{profile.achievements || " "}</p>

//             {/* Contact Form */}
//             <button onClick={handleContactRequest} className="button">
//               Contact
//             </button>

//             {/* I am tryin to implement a contact form button happen.
//                set up a toggle and the button here. 
//                but not sure how to handle when i call contact form. 
//                this pieace of code is borrowed from my other project  */}

//             {/* Contact Form */}
//             {showContactForm && (
//               <div className="contact-form-container">
//                 <ContactForm
//                   recipientEmail={profile?.email || ""}
//                   onContactSubmitted={handleContactSubmitted} />
//                 <button onClick={handleContactRequest} className="button">
//                   Cancel
//                 </button>
//               </div>
//             )}
//             {/* need to pass onContactSubmitted to contact form */}
//             {/* should i pass cancel button as props to contact form? so both button sit next to eachother */}
//           </>
//         ) : (
//           <button
//             onClick={() => {
//               localStorage.setItem("redirectAfterLogin", `/profile/${rolemodelId}`);

//               navigate("/login");
//             }}
//           >
//             Learn More
//           </button>

//         )
//         }
//       </div>
//     </>

//   )
// }

// export default RoleModelProfileDetails;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchLimitedRoleModelProfile from "../api/rolemodeluser_profile/get_publicview_profile";
import fetchRolemodel from "../api/rolemodeluser_profile/get_fulldetailsprofile";
import ContactForm from "./ContactForm";

const RoleModelProfileDetails = ({ rolemodelId, name }) => {
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

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

  const handleContactRequest = () => setShowContactForm(!showContactForm);

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
            <p className="profile-role"><strong>Role:</strong> {profile.current_role}</p>
            <p className="profile-industry"><strong>Industry:</strong> {profile.industry}</p>
            <p className="profile-organization"><strong>Organisation:</strong> {profile.organization}</p>
            <p className="profile-location"><strong>Location:</strong> {profile.location}</p>
          </div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="profile-card">
        <h3 className="section-header">My Journey</h3>
        <p>{profile.journey || "A journey of resilience and innovation in technology."}</p>
      </div>

      {/* Skills Section */}
      <div className="profile-card">
        <h3 className="section-header">Skill Set</h3>
        <ul className="skills-list">
          {profile.skills ? profile.skills.map((skill, index) => <li key={index}>{skill}</li>) : (
            <>
              <li>Product Management</li>
              <li>Strategic Innovation</li>
              <li>Tech Entrepreneurship</li>
              <li>Agile Methodologies</li>
            </>
          )}
        </ul>
      </div>

      {/* Inspiration Section */}
      <div className="profile-card">
        <h3 className="section-header">My Inspiration</h3>
        <p>{profile.inspiration || "Inspiring others through technology and leadership."}</p>
      </div>

      {isAuthenticated ? (
        <>
          {/* Achievements Section */}
          <div className="profile-card">
            <h3 className="section-header">Achievements</h3>
            <p>{profile.achievements || "Notable contributions in technology and innovation."}</p>
          </div>

          {/* Advice Section */}
          <div className="profile-card">
            <h3 className="section-header">Advice</h3>
            <p>{profile.advice || "Never stop learning and embracing challenges as growth opportunities."}</p>
          </div>

          {/* LinkedIn Section */}
          <div className="profile-card">
            <button
              className="linkedin-button"
              onClick={() => window.open(profile.linkedin_url || "https://linkedin.com", "_blank")}
            >
              Connect on LinkedIn
            </button>
          </div>

          {/* Contact Section */}
          <div className="profile-card">
            <button onClick={handleContactRequest} className="contact-button">
              Contact
            </button>
            {showContactForm && (
              <div className="contact-form-container">
                <ContactForm recipientEmail={profile.email || ""} onContactSubmitted={handleContactRequest} />
                <button onClick={handleContactRequest} className="cancel-button">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="profile-card">
          <button
            className="learn-more-button"
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
