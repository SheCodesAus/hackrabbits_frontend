import fetchLimitedCommunityUserProfiles from "../api/communityuser_profile/get_publicview_profiles";
import { useState, useEffect } from "react";

export default function useCommunityUsers() {
    // State to store community user profiles
    const [communityUsers, setCommunityUsers] = useState([]);
    
    // State for loading and error tracking
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    // Fetch community user profiles on component mount
    useEffect(() => {
      fetchLimitedCommunityUserProfiles()
        .then((users) => {
          setCommunityUsers(users);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, []);
  
    // Return state variables
    return { communityUsers, isLoading, error };
}
