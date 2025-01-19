import BackgroundSlideshow from "../components/BackgroundSlideshow";
import React, { useState } from "react";

function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSearch = () => {
    console.log(`Searching for role models in: ${selectedLocation}`);
    // Add functionality to filter role models based on location
  };

  return (
    <>
      {/* Hero Section */}
      <BackgroundSlideshow />
      <div id="app" className="featured_rolemodels">
        <div className="sheinspires_header">
          <div className="sheinspires_header_description">
            <h1>She Inspires!</h1>
            <p>Discover inspiring role models in the tech industry</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
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

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-button">To Inspire</button>
        <button className="action-button">To Be Inspired</button>
        <button className="action-button">Know someone Inspiring</button>
      </div>
    </>
  );
}

export default HomePage;