import BackgroundSlideshow from "../components/BackgroundSlideshow";
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./HomePage.css";
import "../Styles.css"


function HomePage() {


    // if (isLoading) {
    //     return (<p>loading...</p>);
    // }

    // if (error) {
    //     return (<p>Error: {error.message}</p>);
    // }

    const [selectedLocation, setSelectedLocation] = useState("");

    const handleSearch = () => {
        console.log(`Searching for role models in: ${selectedLocation}`);
        // Add functionality to filter role models based on location
    };


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
                <button className="action-button">To Inspires</button>
                <button className="action-button">To Be Inspired</button>
                <button className="action-button">Know someone Inspiring</button>
            </div>

            {/* rolemodel cards Section */}




            <Footer />
        </>
    );
}


export default HomePage;


            /* <div id="rolemodel-list">
                <h1> Featured Role Models</h1>
                render rolemodel cards */
            //     {rolemodel.map((rolemodelData, index) => (
            //         <RolemodelCard key={index} rolemodelData={rolemodelData} customClass="home-page" />
            //     ))}
            // </div>