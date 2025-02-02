import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchPublicCommunityUserProfile from "../api/communityuser_profile/get_publicview_profile";
import fetchFullCommunityUserProfile from "../api/communityuser_profile/get_fulldetailsprofile";

const GeneralUserProfileDetails = (props) => {
  const { communityuserId } = useParams();
  const profile = props.profile;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check authentication
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }

  //   // Fetch profile data from the correct endpoint for public or authenticated user
  //   const fetchData = async () => {
  //     try { console.log(communityuserId)
  //       const data = isAuthenticated
  //         ? await fetchFullCommunityUserProfile(communityuserId)
  //         : await fetchPublicCommunityUserProfile(communityuserId);
  //       setProfile(data);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [communityuserId, isAuthenticated]);

  // if (loading) return <p>Loading profile...</p>;
  // if (!profile) return <p>Profile not found.</p>;
  console.log(props.profile);
  return (
    <div>
      {profile.image && <img src={'https://drive.google.com/file/d/1cq_WSC97TvKpsf1m4Zp4Ku2ncKPECI0e/view?usp=sharing'} alt="Profile" />} 
      <h2>{profile.first_name} {profile.last_name}</h2>
      <p><strong>Current Role:</strong> {profile.current_role}</p>
      <p><strong>Industry:</strong> {profile.industry}</p>
      <p><strong>Location:</strong> {profile.location}</p>

      {isAuthenticated ? (
        <>
          <p><strong>Skills:</strong> {profile.skills?.join(", ")}</p>
          <p><strong>Interests:</strong> {profile.interests?.join(", ")}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {profile.linkedin && (
            <p>
              <strong>LinkedIn:</strong>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </p>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")}>
          Login to View Full Profile
        </button>
      )}
    </div>
  );
};

export default GeneralUserProfileDetails;