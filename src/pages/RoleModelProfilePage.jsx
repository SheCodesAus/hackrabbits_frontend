import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sparkles, Star, RotateCcw, Home } from "lucide-react";
import fetchLimitedRoleModelProfile from "../api/rolemodeluser_profile/get_publicview_profile.js";
import fetchRolemodel from "../api/rolemodeluser_profile/get_fulldetailsprofile.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import "./RoleModelProfilePage.css";
import '../components/LoadingSpinner.css';

function ProfilePage() {
  const params = useParams();
  const navigate = useNavigate();
  const rolemodelId = params.id;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [name, setName] = useState("Role Model Profile");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const loadingMessages = [
    "Gathering inspiration...",
    "Connecting with role models...",
    "Preparing something amazing...",
    "Creating possibilities...",
    "Loading success stories..."
  ];

  const encouragements = [
    "Every challenge is an opportunity!",
    "Success is just around the corner!",
    "Let's break through this barrier together!",
    "Tech pioneers face obstacles too!",
    "Time for some problem-solving magic!"
  ];


  const handleTimelineClick = (year) => {
    setSelectedYear(year);
  };

  const getMilestoneForYear = (year) => {
    const milestones = {
      2011: "Started journey in technology sector with initial focus on software development",
      2015: "Transitioned to product management and led first major project",
      2019: "Expanded role to include strategic innovation initiatives",
      2023: "Currently leading digital transformation projects at KPMG Australia"
    };
    return milestones[year] || "Milestone details not available";
  };

  const handleContactRequest = () => {
    setShowContactForm(!showContactForm);
  };

  const handleContactSubmitted = () => {
    setShowContactForm(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    if (!rolemodelId) {
      setError(new Error("Invalid profile ID"));
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = isAuthenticated
          ? await fetchRolemodel(rolemodelId)
          : await fetchLimitedRoleModelProfile(rolemodelId);
        
        setName(`${data.first_name || ""} ${data.last_name || ""}`.trim() || "Role Model Profile");
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [rolemodelId, isAuthenticated]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-container">
          <div className="spinner-box">
            <div className="spinner">
              <Sparkles className="sparkle-icon" />
            </div>
            <div className="star-container">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`star star-${i + 1}`}>✨</div>
              ))}
            </div>
          </div>
          <p className="loading-text">
            {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-overlay">
        <div className="error-container">
          <div className="error-header">
            <Sparkles className="header-icon sparkle" />
            <h2 className="error-title">Oops! A Small Setback</h2>
            <Star className="header-icon star" />
          </div>
          
          <div className="error-content">
            <p className="error-message">
              Even tech has its moments! Let's try that again.
            </p>
            <p className="encouragement">
              {encouragements[Math.floor(Math.random() * encouragements.length)]} ✨
            </p>
            
            <div className="button-group">
              <button 
                onClick={() => window.location.reload()}
                className="action-button refresh"
              >
                <RotateCcw className="button-icon" />
                Refresh
              </button>
              <button 
                onClick={() => navigate('/')}
                className="action-button home"
              >
                <Home className="button-icon" />
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Header />

      <div className="profile-banner">
        <h1 className="banner-title">Role Model Profile</h1>
      </div>

      <div className="profile-content">
        {/* Profile Info Card */}
        <div className="profile-card">
          <div className="profile-info">
            <div className="profile-image">
              <img
                src={profileData?.profile_image || "/img/Sicilia.jpg"}
                alt={name}
              />
            </div>
            <div className="profile-details">
              <h2 className="profile-name">{name}</h2>
              <div className="profile-text-content">
                <p className="profile-role">{profileData?.current_role || "Integration Developer"}</p>
                <p className="profile-industry">Industry: {profileData?.industry || "Technology"}</p>
                <p className="profile-organization">Organisation: {profileData?.organization || "KPMG Australia"}</p>
                <p className="profile-location">Location: {profileData?.location || "Melbourne"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Section */}
        <div className="profile-card">
          <h3 className="section-header">My Journey</h3>
          <div className="journey-content">
            <p className="journey-text">
              {profileData?.journey ||
                "From a small town to leading innovation in tech, my journey has been about breaking barriers and creating meaningful impact."}
            </p>
            <p className="journey-text">
              {profileData?.journey_description ||
                "Passionate about technology's potential to solve real-world challenges and empower communities."}
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="profile-card">
          <h3 className="section-header">Skill Set</h3>
          <div className="skills-content">
            <ul className="skills-list">
              {profileData?.skills ? (
                profileData.skills.map((skill, index) => (
                  <li key={index} className="skill-item">{skill}</li>
                ))
              ) : (
                <>
                  <li className="skill-item">Product Management</li>
                  <li className="skill-item">Strategic Innovation</li>
                  <li className="skill-item">Tech Entrepreneurship</li>
                  <li className="skill-item">Agile Methodologies</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="profile-card">
          <h3 className="section-header">Interactive Achievement Timeline</h3>
          <div className="timeline-container">
            <div className="timeline">
              <div className="timeline-line"></div>
              {[2011, 2015, 2019, 2023].map((year) => (
                <button
                  key={year}
                  className="timeline-point"
                  onClick={() => handleTimelineClick(year)}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-year">{year}</div>
                </button>
              ))}
            </div>

            <div className="timeline-details">
              <p className="timeline-instruction">Click on a year above to reveal its specific milestone.</p>
              <p className="timeline-description">
                Each year represents a significant point in the journey, showcasing personal and professional growth.
              </p>
              {selectedYear && (
                <div className="timeline-milestone">
                  <h4>Selected Milestone Details</h4>
                  <p>{getMilestoneForYear(selectedYear)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inspiration Section */}
        <div className="profile-card">
          <h3 className="section-header">My Inspiration</h3>
          <div className="inspiration-content">
            <p className="inspiration-text">
              {profileData?.inspiration ||
                "Empower others by creating technologies that solve real-world challenges."}
            </p>
          </div>
        </div>

        {isAuthenticated ? (
          <>
            {/* Achievements Section */}
            <div className="profile-card">
              <h3 className="section-header">Achievements</h3>
              <div className="achievements-content">
                <p className="achievement-text">{profileData?.achievements || "Notable accomplishments in technology and leadership."}</p>
              </div>
            </div>

            {/* Advice Section */}
            <div className="profile-card">
              <h3 className="section-header">Advice</h3>
              <div className="advice-content">
                <p className="advice-text">{profileData?.advice || "Focus on continuous learning and embrace challenges as opportunities for growth."}</p>
              </div>
            </div>

            {/* LinkedIn Connection */}
            <div className="profile-card">
              <div className="linkedin-connect">
                <button
                  onClick={() => window.open(profileData?.linkedin_url || 'https://linkedin.com', '_blank')}
                  className="linkedin-button"
                >
                  Connect on LinkedIn
                </button>
              </div>
            </div>
            {/* Contact Section */}
            <div className="profile-card">
              <button onClick={handleContactRequest} className="contact-button">
                Contact
              </button>

              {showContactForm && (
                <div className="contact-form-container">
                  <ContactForm
                    recipientEmail={profileData?.email || ""}
                    onContactSubmitted={handleContactSubmitted}
                  />
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

      <Footer />
    </div>
  );
}

export default ProfilePage;