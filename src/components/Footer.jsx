import React from "react";
import "../styles.css";
import femalesymbol from "../../img/femalesymbol.png";
import nonbinarysymbol from "../../img/nonbinarysymbol.jpg";
import uniteicon from "../../img/uniteicon.png";

function Footer() {
  return (
    <div className="footer">
      <div className="iconcontainer">
        <img
          className="inclusiveicons"
          src={femalesymbol}
          alt="the symbol for female"
        />
        <img
          className="inclusiveicons"
          src={nonbinarysymbol}
          alt="the symbol for non-binary"
        />
        <img
          className="inclusiveicons"
          src={uniteicon}
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