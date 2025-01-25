
async function signupCommunityUser() {
    //once in use decide if the header is json or formdata
    // console.log(formData);
    const url = `${import.meta.env.VITE_API_URL}/community-user/signup/`;
    

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
             
            },
            body: formData, 
                });



        if (!response.ok) {
            const fallbackError = "Error trying to create a project";

            const data = await response.json().catch(() => {
                throw new Error(fallbackError);
            });

            const errorMessage = data?.detail ?? fallbackError;
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in signuoCommunityUser:", error.message);
        throw error;
    }
}

export default signupCommunityUser;
