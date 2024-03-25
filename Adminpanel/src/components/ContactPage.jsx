import React from "react";

const ContactPage = () => {
  const handleWhatsAppRedirect = () => {
    // Redirect to WhatsApp
    window.location.href = "https://wa.me/9384937465"; // Replace with your WhatsApp number
  };

  const handleEmailRedirect = () => {
    // Redirect to Email application
    window.location.href = "mailto:sheriffrocks.05@gmail.com"; // Replace with your email address
  };

  const handlePhoneRedirect = () => {
    // Redirect to Phone application (assuming it's a mobile device)
    window.location.href = "tel:+9384937465"; // Replace with your phone number
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <button onClick={handleWhatsAppRedirect}>Open WhatsApp</button>
      <button onClick={handleEmailRedirect}>Send Email</button>
      <button onClick={handlePhoneRedirect}>Call Us</button>
    </div>
  );
};

export default ContactPage;
