export const fetchLimitedCommunityUserProfile = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/community-user/public-profile/${userId}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching community user profile:', error);
      throw error;
    }
  };
  
  export const fetchFullCommunityUserProfile = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/community-user/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching full community user profile:', error);
      throw error;
    }
  };