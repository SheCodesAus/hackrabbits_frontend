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


// import fetchLimitedRoleModelProfile from "../api/rolemodeluser_profile/get_publicview_profile.js";
// import fetchRoleModel from "../api/rolemodeluser_profile/get_fulldetailsprofile.js"; // Full details endpoint
// import { useState, useEffect, useCallback } from "react";

// export default function useRolemodel(rolemodelId) {
//   const [rolemodel, setRolemodel] = useState();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState();

//   // Check if user is authenticated (basic example)
//   const isAuthenticated = !!localStorage.getItem("token");

//   const fetchProfile = useCallback(() => {
//     setIsLoading(true);

//     // Fetch full profile if authenticated, otherwise fetch limited profile
//     const fetchFunction = isAuthenticated ? fetchRoleModel : fetchLimitedRoleModelProfile;

//     fetchFunction(rolemodelId)
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
//   }, [rolemodelId, isAuthenticated]);

//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile]);

//   return { rolemodel, isLoading, error, refetch: fetchProfile };
// }


import getRolemodels from "../api/rolemodeluser_profile/get_publicview_profiles";
import { useState, useEffect } from "react";



export default function useRolemodels() {
    // Here we use the useState hook to create a state variable called rolemodels and a function to update it called setRolemodels. We initialize the state variable with an empty array.
    const [rolemodels, setRolemodels] = useState([]);
  
    // We also create a state variable called isLoading and error to keep track of the loading state and any errors that might occur.
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
  
    // We use the useEffect hook to fetch the rolemodels from the API and update the state variables accordingly.
    // This useEffect will only run once, when the component this hook is used in is mounted.
    useEffect(() => {
      getRolemodels()
        .then((rolemodels) => {
          setRolemodels(rolemodels);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, []);
  
    // Finally, we return the state variables and the error. As the state in this hook changes it will update these values and the component using this hook will re-render.
    return { rolemodels, isLoading, error };
  }