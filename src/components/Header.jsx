import React from "react";
import "../styles.css";
import NavBar from "./NavBar.jsx";

function Header() {
    return (
      
        <div class="header">
                <NavBar />
          <img class="heroimg" src="img/teal_to_purple_gradient_background.png"
          alt="A brightly coloured logo that says She Inspires in a retro font, surrounded by stars" />
        </div>

    )
}

export default Header