import React from "react";
import "../styles.css";
import NavBar from "./NavBar.jsx";
import sheinspirelogo from "../../img/sheinspirescroplogo.png";

function Header() {
    return (

        <div class="header">
            <NavBar />
            <img class="heroimg" src={sheinspirelogo}
                alt="A brightly coloured logo that says She Inspires in a retro font, surrounded by stars" />
        </div>

    )
}

export default Header