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


            {/* Search  bar */}

            <div className="search-section">
                <SearchBar onFilter={handleFilter} />
            </div>



            {/* sign_buttons (she inspires, to be inspired , ) */}

            {/* Action Buttons */}
            <div className="action-buttons">
                <button
                    className="action-button"
                    onClick={() => handleSignUpNavigation("role-model")}
                >
                    To Inspire
                </button>
                <button
                    className="action-button"
                    onClick={() => handleSignUpNavigation("community-user")}
                    >
                    To Be Inspired
                </button>
                <button 
                    className="action-button"
                    onClick={() => navigate('/invite')}  
                >
                    Know someone Inspiring
                </button>
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

