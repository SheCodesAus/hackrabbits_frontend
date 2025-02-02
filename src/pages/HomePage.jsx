import BackgroundSlideshow from "../components/BackgroundSlideshow";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./HomePage.css";
import "../styles.css";

import useRolemodels from "../hooks/use-rolemodels";
import RolemodelCard from "../components/RolemodelCard";

import SearchBar from "../components/SearchBar";

function HomePage() {
    const navigate = useNavigate();
    const [filteredRolemodels, setFilteredRolemodels] = useState([]);
    const { rolemodels, isLoading, error } = useRolemodels();



    const handleSignUpNavigation = (type) => {
        navigate(`/signup?type=${type}`);
    };

    useEffect(() => {
        // Set default grid with all role models when data is loaded
        setFilteredRolemodels(rolemodels);
    }, [rolemodels]);

    const handleFilter = (selectedLocation) => {
        if (!selectedLocation) {
            // If no location is selected, show all role models
            setFilteredRolemodels(rolemodels);
        } else {
            // Filter based on the selected location
            const filtered = rolemodels.filter(
                (rolemodel) =>
                    rolemodel.location &&
                    rolemodel.location.toLowerCase() ===
                    selectedLocation.toLowerCase()
            );
            setFilteredRolemodels(filtered);
        }
    };

    if (isLoading) {
        return (<p>loading...</p>);
    }

    if (error) {
        return (<p>Error: {error.message}</p>);
    }


    return (
        <>
            <Header />

            {/* <NavBar /> */}


            {/* Hero Section */}

            <BackgroundSlideshow />
            <div id="app" className="featured_rolemodels">
                <div className="sheinspires_header">
                    <div className="sheinspires_header_description">
                    </div>
                </div>
            </div>


{/* Interactive Menu */}
<div className="interactive-menu">
    
    {/* Search Section */}
    <div className="search-section">
        <h2>Looking for someone inspiring in your city?</h2>
        <p>Use the search bar below...</p>
        <SearchBar onFilter={handleFilter} />
    </div>
    
    <p className="hero-statement">
        She Inspires is a designated resource for women and non-binary folk to connect and inspire one another! Create a profile and start inspiring! Not your jam? We have a community user option if you'd like to join and find some inspiration! 
    </p>

    
    {/* Action Buttons Section */}
    <div className="button-section">
        <div className="button-text">
            <h2>..or looking for something else?</h2>
            <p>The buttons below are sure to help!</p>
        </div>

        <div className="action-buttons flex flex-col md:flex-row items-center justify-center gap-4">
            <button
                className="action-button bg-blue-500 text-white py-2 px-4 rounded-2xl shadow-md hover:bg-blue-600 transition duration-300"
                onClick={() => handleSignUpNavigation("role-model")}
            >
                I'm here to inspire!
            </button>
            <button
                className="action-button bg-green-500 text-white py-2 px-4 rounded-2xl shadow-md hover:bg-green-600 transition duration-300"
                onClick={() => handleSignUpNavigation("community-user")}
            >
                I need inspiration!
            </button>
            <button 
                className="action-button bg-purple-500 text-white py-2 px-4 rounded-2xl shadow-md hover:bg-purple-600 transition duration-300"
                onClick={() => navigate('/invite')}
            >
                I know someone inspiring!
            </button>
        </div>
    </div>
</div>
            {/* rolemodel cards Section */}


            <div id="rolemodel-list">
                <h1> Featured Role Models</h1>
                <div className="cards-container">
                    {filteredRolemodels.length > 0 ? (
                        filteredRolemodels.map((rolemodelData, key) => (
                            <RolemodelCard key={key} rolemodelData={rolemodelData} />
                        ))
                    ) : (
                        <p>No role models found for the selected location.</p>
                    )}
                </div>
            </div>






            <Footer />
        </>
    );
}


export default HomePage;

