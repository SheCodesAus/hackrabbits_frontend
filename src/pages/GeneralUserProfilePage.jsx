import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralUserProfileDetails from "../components/GeneralUserProfileDetails";
import fetchFullCommunityUserProfile from "../api/communityuser_profile/get_fulldetailsprofile.js";
import "./GeneralUserProfilePage.css";
import useCommunityuser from "../hooks/use-communityuser.js"; // Fix import name


function GeneralUserProfilePage() {
  const navigate = useNavigate();

  // State to store profile data, loading state, and errors
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("My Profile"); // Default page title

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   navigate("/login"); // Redirect to login if no token found
    //   return;
    // }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await get_profile(); // API fetches profile using stored token
        setProfile(data);
        setName(`${data.first_name || ""} ${data.last_name || ""}`.trim() || "My Profile"); // Set profile name
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    // fetchFullCommunityUserProfile();
  }, [navigate]);

  // if (isLoading) return <p>Loading...</p>; // Show loading state
  // if (error) return <p>Error: {error.message}</p>; // Handle errors
  // if (profile) return <p>No profile data found.</p>; // Handle empty profile

  const fakeProfile = {image: "https://sheinspire-ff5867c4dc81.herokuapp.com/role-models/public/image", first_name: "Sicilia", last_name: "Perumalsamy", current_role: "Public Health Researcher", industry: "Health", location: "Perth"}

  return (
    <div className="profile-page-container">
      <h1>{name}</h1>
      <GeneralUserProfileDetails profile={fakeProfile} isOwnProfile={true} />
    </div>
  );
}

export default GeneralUserProfilePage;
