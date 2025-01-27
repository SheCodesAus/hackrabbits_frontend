async function getRolemodels() {

    const url = `${import.meta.env.VITE_API_URL}/role-models/public`;

    try {
      
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        const fallbackError = "Error fetching rolemodels";
        const data = await response.json().catch(() => {
          throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // Log network or other unexpected errors
    console.error("Network or fetch error in getRolemodels:", error.message);
    throw new Error("An unexpected error occurred while fetching rolemodels. Please try again later.");
}
}

export default getRolemodels;