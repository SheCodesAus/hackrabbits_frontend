import React, { useEffect, useState } from "react";
import "./BackgroundSlideshow.css";


const images = [
    // links of images
    "https://shecodes.com.au/wp-content/uploads/2021/10/She-Codes_-220-e1639540932458.jpg",
    "https://women-in-tech-mentoring.oneuponedown.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-img-wit-min.d91c76f2.jpg&w=3840&q=75",
    "https://shecodes.com.au/wp-content/uploads/2021/10/pssmileproduction_shecodes-59-scaled.jpg"
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