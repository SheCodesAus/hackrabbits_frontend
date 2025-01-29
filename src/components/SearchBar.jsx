import React, { useState } from "react";
import PropTypes from "prop-types";
// import "./SearchBar.css";

function SearchBar({ onFilter }) {
    const [selectedLocation, setSelectedLocation] = useState("");

    const handleSearch = () => {
        // Pass the selected location to the parent component
        onFilter(selectedLocation);
    };

    return (
        <div className="search-section">
            <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="location-dropdown"
            >
                <option value="">Select a Location</option>
                <option value="PERTH">Perth</option>
                <option value="ADELAIDE">Adelaide</option>
                <option value="MELBOURNE">Melbourne</option>
                <option value="HOBART">Hobart</option>
                <option value="CANBERRA">Canberra</option>
                <option value="SYDNEY">Sydney</option>
                <option value="BRISBANE">Brisbane</option>
                <option value="DARWIN">Darwin</option>



            </select>
            <button onClick={handleSearch} className="search-button">
                Search
            </button>
        </div>
    );
}

SearchBar.propTypes = {
    onFilter: PropTypes.func.isRequired,
};

export default SearchBar;
