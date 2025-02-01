// src/hooks/use-communityuser.js
import { useState, useEffect } from 'react';
import { get_profile } from '../api/communityuser_profile/get_profile.js';

const useCommunityuser = (userId) => {
  const [communityuser, setCommunityuser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await get_profile(userId);
      setCommunityuser(data);
      setError(null);
    } catch (err) {
      setError(err);
      setCommunityuser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return {
    communityuser,
    isLoading,
    error,
    refetch: fetchData
  };
};

export default useCommunityuser;