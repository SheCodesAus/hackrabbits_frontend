import React, { useEffect, useState } from "react";
import "./BackgroundSlideshow.css";


const images = [
    // links of images
];

const BackgroundSlideshow = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); //  5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="background-slideshow"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        >
            <div className="slideshow-content">
                <h1>She Inspires</h1>
                {/* <button className="cta-button">Here to inspire!</button> */}
                <p>For this part we need a nice content stay on the slideshow.</p>
            </div>
        </div>
    );
};

export default BackgroundSlideshow;