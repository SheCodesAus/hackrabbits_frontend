// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import RoleModelProfileDetails from "../components/RMProfileDetails";
// import fetchLimitedRoleModelProfile from "../api/rolemodeluser_profile/get_publicview_profile";
// import useRolemodel from "../hooks/use-rolemodels";


// i have two endpoints 
// one public view profile page 
// one full detail profile page

// on click to learn more button on the homepage I want to navigate to profile page limited version or full version. 

// on profile page I will call profile detail component. but also i need to get full name of the person from the url which doens't matter from what endpoint

// to get the full name. I need to use param to get the id 

//then i need to have a hook to get the id from url


// function ProfilePage() {
//   //get rolemodel id from url with param
//   const { id: rolemodelId } = useParams();

//   const { rolemodels, isLoading, error, refetch} = useRolemodel;

//   const [name, setName] = useState("Role Model Profile");

// // a hook to get full name from publicview endpoint
//   useEffect(() => {
//     const fetchName = async () => {
//       try {
//         const data = await fetchLimitedRoleModelProfile(id);
//         setName(`${data.first_name || ""} ${data.last_name || ""}`.trim() || "Role Model Profile");
//       } catch (error) {
//         console.error("Error fetching role model name:", error);
//       }
//     };

//     fetchName();
//   }, [id]);

//   return (
//     <div className="profile-page-container">
//       <h1>{name}</h1>
//       <RoleModelProfileDetails rolemodelId={id} />
//     </div>
//   );
// };

// export default ProfilePage;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoleModelProfileDetails from "../components/RMProfileDetails.jsx";
import fetchLimitedRoleModelProfile from "../api/rolemodeluser_profile/get_publicview_profile.js";
import useRolemodel from "../hooks/use-rolemodel.js"; // Fix import name

function ProfilePage() {
  // const { id: rolemodelId } = useParams(); // Extract ID from URL
  const params = useParams();

  console.log("🔍 Params object:", params); // Debugging

  const rolemodelId = params.id;
  console.log("🔍 Extracted rolemodelId from useParams:", rolemodelId);  // Debugging

  if (!rolemodelId) {
    console.error("🚨 Error: rolemodelId is undefined! Check router setup.");
    return <p>Error: Invalid profile ID.</p>;
  }


  const { rolemodel, isLoading, error, refetch } = useRolemodel(rolemodelId); // Fetch role model data


  // I don't know what's I am getting wrong. id is coming from useParams but also in useRolemodel hook I pass the rolemodelId which seems not getting anywhere 

  const [name, setName] = useState("Role Model Profile");

  // Fetch name for the profile page title
  useEffect(() => {
    const fetchName = async () => {
      try {
        const data = await fetchLimitedRoleModelProfile(rolemodelId);
        setName(`${data.first_name || ""} ${data.last_name || ""}`.trim() || "Role Model Profile");
      } catch (error) {
        console.error("Error fetching role model name:", error);
      }
    };

    fetchName();
  }, [rolemodelId]);

  return (
    <div className="profile-page-container">
      <h1>{name}</h1>
      {isLoading ? <p>Loading...</p> : <RoleModelProfileDetails rolemodelId={rolemodelId} />}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default ProfilePage;






