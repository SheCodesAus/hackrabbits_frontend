import React from "react";
import "../styles.css";

function Footer() {
  return (
    <div className="footer">
      <div className="iconcontainer">
        <img
          className="inclusiveicons"
          src="img/femalesymbol.png"
          alt="the symbol for female"
        />
        <img
          className="inclusiveicons"
          src="img/nonbinarysymbol.jpg"
          alt="the symbol for non-binary"
        />
        <img
          className="inclusiveicons"
          src="img/uniteicon.png"
          alt="diverse colours of hands surrounding a heart"
        />
      </div>
      <div className="copyright">
        <p>© HackRabbits 2025</p>
      </div>
    </div>
  );
}

export default Footer;