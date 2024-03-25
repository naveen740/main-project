import React, { useState, useEffect } from "react";
import "./css/ImageSlider.css";

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    require("../images/img6.jpeg"), // Path to your images, make sure they're in the 'src' folder
    require("../images/img7.jpeg"), // Path to your images, make sure they're in the 'src' folder
    require("../images/img8.jpeg"), // Path to your images, make sure they're in the 'src' folder
    require("../images/img9.jpeg"), // Path to your images, make sure they're in the 'src' folder
    require("../images/img10.jpeg"), // Path to your images, make sure they're in the 'src' folder
    require("../images/img11.jpeg"), // Path to your images, make sure they're in the 'src' folder
    require("../images/img12.jpeg"), // Path to your images, make sure they're in the 'src' folder
    require("../images/img13.jpeg"), // Path to your images, make sure they're in the 'src' folder
    require("../images/img14.jpeg"), // Path to your images, make sure they're in the 'src' folder
    require("../images/img15.jpeg"), // Path to your images, make sure they're in the 'src' folder

    // Add more images as needed
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds (3000 milliseconds)

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [images.length]);

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`, // Slide images horizontally
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="slider-image"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
