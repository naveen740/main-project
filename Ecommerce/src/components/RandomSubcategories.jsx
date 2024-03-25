// RandomSubcategories.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/RandomSubcategories.css"; // Import the CSS file

function RandomSubcategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getRandomSubcategories = (subcategories) => {
    const shuffled = subcategories.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category._id} className="category-container">
          <h2 className="category-title">{category.category}</h2>
          <div className="subcategory-slider">
            {getRandomSubcategories(category.subcategories).map(
              (subcategory) => (
                <div key={subcategory._id} className="subcategory-card">
                  <img
                    src={`http://localhost:5000/${category.image}`}
                    alt={subcategory.name}
                    className="subcategory-image"
                  />
                  <div className="subcategory-details">
                    <h3 className="subcategory-name">{subcategory.name}</h3>
                    <p className="subcategory-description">
                      {subcategory.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RandomSubcategories;
