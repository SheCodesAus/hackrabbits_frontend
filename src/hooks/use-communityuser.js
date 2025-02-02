import fetchLimitedCommunityUserProfile from "../api/communityuser_profile/get_publicview_profile.js";
import fetchCommunityUserProfile from "../api/communityuser_profile/get_fulldetailsprofile.js"; // Full details endpoint
import { useState, useEffect, useCallback } from "react";

export default function useCommunityUser(userId) {
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  // Check if user is authenticated (basic example)
  const isAuthenticated = !!localStorage.getItem("token");

  const fetchProfile = useCallback(() => {
    setIsLoading(true);

    // Fetch full profile if authenticated, otherwise fetch limited profile
    const fetchFunction = isAuthenticated ? fetchCommunityUserProfile : fetchLimitedCommunityUserProfile;

    fetchFunction(userId)
      .then((profile) => {
        setProfile(profile);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId, isAuthenticated]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isLoading, error, refetch: fetchProfile };
}
