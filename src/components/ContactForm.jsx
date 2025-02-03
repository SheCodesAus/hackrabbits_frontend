import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ContactForm.css"


const ContactForm = ({ onContactSubmitted, recipientEmail }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSendEmail = (event) => {
        event.preventDefault();

        const { fullName, email, subject, message } = formData;

        if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            alert("Please fill in all required fields.");
            return;
        }

        // const recipientEmail = "example@email.com"; // Replace with your contact email
        const encodedSubject = encodeURIComponent(`Contact Request: ${subject}`);
        const encodedBody = encodeURIComponent(
            `Full Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        // Open user's email client with pre-filled details
        window.location.href = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;

        // Notify parent component that the form was submitted
        if (onContactSubmitted) {
            onContactSubmitted();
        }

        // Clear form after sending
        setFormData({
            fullName: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <form onSubmit={handleSendEmail} className="contact-form">
            <div className="form-group">
                <label htmlFor="fullName">Your Full Name <span className="required">*</span></label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Your Email <span className="required">*</span></label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="subject">Subject <span className="required">*</span></label>
                <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select...</option>
                    <option value="Guest Speaker Request">Guest Speaker Request</option>
                    <option value="Mentorship Inquiry">Mentorship Inquiry</option>
                    <option value="Career Advice">Career Advice</option>
                    <option value="Collaboration Opportunity">Collaboration Opportunity</option>
                    <option value="Media & Interviews">Media & Interviews</option>
                    <option value="General Inquiry">General Inquiry</option>

                </select>




            </div>

            <div className="form-group">
                <label htmlFor="message">Message <span className="required">*</span></label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                ></textarea>
            </div>



            <div className="button-container">
                <button type="submit" className="action-button">Send an Email</button>
            </div>

        </form>
    );
};

// Define PropTypes
ContactForm.propTypes = {
    onContactSubmitted: PropTypes.func,
    recipientEmail: PropTypes.string.isRequired,

};

export default ContactForm;
