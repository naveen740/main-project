import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/AddOrderPage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

function AddOrderPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toggleLinePosition, setToggleLinePosition] = useState(0); // State for toggle line position
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
      // Set the default category to the first category in the list
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Error fetching categories. Please try again later.");
      setLoading(false);
    }
  };

  const handleCategorySelect = (category, index) => {
    setSelectedCategory(category);
    setToggleLinePosition(index); // Update toggle line position when category is selected
  };

  return (
    <div className="add-order-container">
      <div className="add-top">
        <div className="img-top">
          {/* This is how you render an image in React */}
          <img src="/images/img7.jpeg" alt="Description of the image" />

          <div className="top-first">
            {/* Instead of using FontAwesomeIcon, use a Link component */}
            <Link to="/home" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div>Add Order</div>
          </div>
          <div className="top-second">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <Link to="/cart" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faCartShopping} />{" "}
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="add-ctg">
          <div className="category-list">
            {categories.map((category, index) => (
              <button
                key={category._id}
                onClick={() => handleCategorySelect(category, index)}
                className={`category-button ${
                  selectedCategory && selectedCategory._id === category._id
                    ? "selected-category"
                    : ""
                }`}
              >
                {category.category}
              </button>
            ))}
            {/* Toggle line element */}
          </div>
          {selectedCategory && (
            <ul>
              {selectedCategory.subcategories.map((subcategory, index) => (
                <div className="li-list">
                  <li key={subcategory._id} className="subcategory-item">
                    <Link
                      to={`/prod/${selectedCategory._id}/${subcategory._id}`}
                      className="subcategory-link"
                    >
                      {`${index + 1}. ${subcategory.name}`}
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default AddOrderPage;
