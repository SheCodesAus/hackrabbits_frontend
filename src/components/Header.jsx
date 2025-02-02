import React from "react";
import "../styles.css";
import NavBar from "./NavBar.jsx";
import sheinspirelogo from "../../img/SheInspiresMinCrop.png";
import "./HeaderAnimation.css"


function Header() {
    return (

        <div className="header">
                <NavBar />
            <img className="heroimg" src={sheinspirelogo}
                alt="A brightly coloured logo that says She Inspires in a retro font" />
                <div className="tagline">
                    <h3 className="animatedtext">
                        <span>Like </span>
                        <span>a </span>
                        <span>butterfly, </span>
                        <span>each </span>
                        <span>idea </span>
                        <span>flows </span>
                        <span>through </span>
                        <span>her, </span>
                        <span>inspiring </span>
                        <span>vibrant </span>
                        <span>connections </span>
                        <span>to </span>
                        <span>help </span>
                        <span>others </span>
                        <span>soar </span>
                    </h3>
                </div>    
        </div>

        

    )
}

export default Header