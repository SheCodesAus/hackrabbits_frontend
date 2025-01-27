export default async function getRolemodels() {
  // Add debug logging for the API URL
  if (!import.meta.env.VITE_API_URL) {
      console.error('VITE_API_URL is not defined in environment variables');
      throw new Error('API URL is not configured');
  }
  
  const url = `${import.meta.env.VITE_API_URL}/role-models/public`;
  console.log('Full API URL:', url); // This will help us verify the complete URL

  try {
      const response = await fetch(url, { 
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
      }

      return await response.json();
  } catch (error) {
      console.error('Fetch error:', {
          message: error.message,
          url: url
      });
      throw error;
  }
}