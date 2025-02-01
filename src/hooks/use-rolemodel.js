
import fetchLimitedRoleModelProfile from "../api/rolemodeluser_profile/get_publicview_profile.js";
import fetchRoleModel from "../api/rolemodeluser_profile/get_fulldetailsprofile.js"; // Full details endpoint
import { useState, useEffect, useCallback } from "react";

export default function useRolemodel(rolemodelId) {
  const [rolemodel, setRolemodel] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  // Check if user is authenticated (basic example)
  const isAuthenticated = !!localStorage.getItem("token");

  const fetchProfile = useCallback(() => {
    setIsLoading(true);

    // Fetch full profile if authenticated, otherwise fetch limited profile
    const fetchFunction = isAuthenticated ? fetchRoleModel : fetchLimitedRoleModelProfile;

    fetchFunction(rolemodelId)
      .then((rolemodel) => {
        setRolemodel(rolemodel);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [rolemodelId, isAuthenticated]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { rolemodel, isLoading, error, refetch: fetchProfile };
}





// import fetchLimitedRoleModelProfile from "../api/rolemodeluser_profile/get_publicview_profile.js";
// import { useState, useEffect, useCallback } from "react";

// export default function useRolemodel(rolemodelId) {
//   const [rolemodel, setRolemodel] = useState();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState();

//   // Rename function to avoid conflict
//   const fetchProfile = useCallback(() => {
//     setIsLoading(true);
//     fetchLimitedRoleModelProfile(rolemodelId)
//       .then((rolemodel) => {
//         setRolemodel(rolemodel);
//         setError(null);
//       })
//       .catch((error) => {
//         setError(error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [rolemodelId]);

//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile]);

//   return { rolemodel, isLoading, error, refetch: fetchProfile }; // Expose refetch function
// }

