import React, { useEffect, useState, useCallback } from "react";
import "./BackgroundSlideshow.css";

const images = [
    "https://shecodes.com.au/wp-content/uploads/2021/10/She-Codes_-220-e1639540932458.jpg",
    "https://women-in-tech-mentoring.oneuponedown.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-img-wit-min.d91c76f2.jpg&w=3840&q=75",
    "https://shecodes.com.au/wp-content/uploads/2021/10/pssmileproduction_shecodes-59-scaled.jpg"
];

const BackgroundSlideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to handle image transitions
    const nextImage = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, []);

    // Auto-change background image every 5 seconds
    useEffect(() => {
        const interval = setInterval(nextImage, 5000);
        return () => clearInterval(interval);
    }, [nextImage]);

    return (
        <section 
            className="background-slideshow" 
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
            aria-live="polite"
        >
            {/* Dark overlay for better text visibility */}
            <div className="overlay">
                <div className="slideshow-content">
                    <h2 className="title">She Inspires</h2>     
                    <h3 className="subtitle">To inspire and to be inspired</h3>
                    {/* Future CTA button */}
                    {/* <button className="cta-button">Here to inspire!</button> */}
                </div>
            </div>
        </section>
    );
};

export default BackgroundSlideshow;