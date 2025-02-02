export default async function fetchFullCommunityUserProfile(communityUserId) {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    console.error("VITE_API_URL is not defined in environment variables");
    return Promise.reject(new Error("API URL is not configured"));
  }

  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject(new Error("Please log in to see full details on profile."));
  }

  const url = `${apiUrl}/community-users/${communityUserId}`;
  console.log("Full API URL:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", { message: error.message, url });
    return Promise.reject(error);
  }
}