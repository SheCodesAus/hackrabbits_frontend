import BackgroundSlideshow from "../components/BackgroundSlideshow";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./HomePage.css";
import "../Styles.css";

import useRolemodels from "../hooks/use-rolemodels";
import RolemodelCard from "../components/RolemodelCard";

function HomePage() {
    const navigate = useNavigate();

    const { rolemodels, isLoading, error } = useRolemodels();
    const [selectedLocation, setSelectedLocation] = useState("");

    const handleSearch = () => {
        console.log(`Searching for role models in: ${selectedLocation}`);
        // Add functionality to filter role models based on location
    };

    const handleSignUpNavigation = (type) => {
        navigate(`/signup?type=${type}`);
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
                        {/* <h1>She Inspires!</h1>
                        <p>nice content about website in 1-2 sentence</p> */}
                    </div>
                </div>
            </div>


            {/* Search  bar */}

            <div className="search-section">
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="location-dropdown"
                >
                    <option value="">Select a Location</option>
                    <option value="Perth">Perth</option>
                    <option value="Sydney">Sydney</option>
                    <option value="Melbourne">Melbourne</option>
                    <option value="Brisbane">Brisbane</option>
                </select>
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
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
                <button className="action-button">Know someone Inspiring</button>
            </div>

            {/* rolemodel cards Section */}


            <div id="rolemodel-list">
                <h1> Featured Role Models</h1>

                {rolemodels.map((rolemodelData, key) => (
                    <RolemodelCard key={key} rolemodelData={rolemodelData} />
                ))}
            </div>


            <Footer />
        </>
    );
}


export default HomePage;

