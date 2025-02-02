import React from "react";
import "../styles.css";
import NavBar from "./NavBar.jsx";
import sheinspirelogo from "../../img/SheInspiresMinCrop.png";
import "./HeaderAnimation.css";

function Header() {
    const taglineWords = [
        "Like", "a", "butterfly,", "each", "idea", "flows", "through", "her,",
        "inspiring", "vibrant", "connections", "to", "help", "others", "soar"
    ];

    return (
        <div className="header">
            <div className="logo-container">
                <a href="/" aria-label="She Inspires Homepage">
                    <img className="heroimg" src={sheinspirelogo} 
                        alt="A brightly coloured logo that says She Inspires in a retro font" />
                </a>
            </div>
            <div className="tagline-container">
                <h3 className="animatedtext">
                    {taglineWords.map((word, index) => (
                        <span key={index}>{word} </span>
                    ))}
                </h3>
            </div>
            <NavBar />
        </div>
    );
}

export default Header;