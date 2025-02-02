import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralUserProfileDetails from "../components/GeneralUserProfileDetails";
import { get_profile } from "../api/communityuser_profile/get_profile.js";

import "../styles.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function GeneralUserProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await get_profile();  // No need to pass ID - API will use token
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <>
    <Header />
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <GeneralUserProfileDetails 
        profile={profile} 
        isOwnProfile={true} // This flag can be used to show edit options
      />
    </div>
    <Footer />
  </>
  );
}

export default GeneralUserProfilePage;