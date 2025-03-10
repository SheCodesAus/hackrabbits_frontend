import React from "react";
import "../styles.css";
import prideflag from "../../img/prideflag.jpg";
import uniteicon from "../../img/uniteicon.png";
import indigflag from "../../img/indigflag.png";


function Footer() {
  return (
    <div className="footer">
      <div className="iconcontainer">
        <img
          className="inclusiveicons"
          src={prideflag}
          alt="the rainbow flag for LGBTQIA+"
        />
        <img
          className="inclusiveicons"
          src={uniteicon}
          alt="diverse colours of hands surrounding a heart"
        />
                <img
          className="inclusiveicons"
          src={indigflag}
          alt="the indigenous Australian flag - a yellow sun on red earth and black sky"
        />
      </div>
      <div className="acknowledgement">
        <p>She Inspires recognises and acknowledges that the traditional owners of land on which this project was created, are the Whadjuk-Nyoongar people. </p>
        <p>Always was, and always will be.</p>
      </div>
      <div className="copyright">
        <p>© HackRabbits 2025</p>
      </div>
    </div>
  );
}

export default Footer;