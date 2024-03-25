import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./css/ProductPage.css";

function ProductPage() {
  const { categoryId, subcategoryId } = useParams();
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [isInch, setIsInch] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/prod/${categoryId}/${subcategoryId}`
        );
        setProducts(response.data);
        setLoading(false);
        if (response.data.length > 0) {
          setSubcategoryName(response.data[0].subcategory.name);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, subcategoryId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setFormVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddToCartClick = (product) => {
    if (selectedProduct && selectedProduct._id === product._id) {
      setSelectedProduct(null); // Deselect the product
      setFormVisible(false); // Hide the form
    } else {
      setSelectedProduct(product);
      setFormVisible(true);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = {
        productId: selectedProduct._id,
        width,
        height,
        quantity,
      };

      const response = await axios.post(
        "http://localhost:5000/api/order",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Add to cart successful:", response.data);
      setFormVisible(false);
      // Optionally, you can navigate to the cart page after successful addition
      navigate("/home");
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error accordingly
    }
  };

  const handleAddAndGoToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = {
        productId: selectedProduct._id,
        width,
        height,
        quantity,
      };

      const response = await axios.post(
        "http://localhost:5000/api/order",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Added to cart and go to cart:", response.data);
      setFormVisible(false);
      // Optionally, you can navigate to the cart page after successful addition
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error accordingly
    }
  };

  return (
    <div className={`product-page ${formVisible ? "dim-background" : ""}`}>
      <div className="product-top">
        <Link to="/add-order" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
        </Link>
        <h2 className="subcategory-name">{subcategoryName}</h2>
      </div>
      {loading ? (
        <p className="loading">Loading products...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className={`product-list ${formVisible ? "dimmed" : ""}`}>
          {products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleAddToCartClick(product)}
            >
              <div className="product-image">
                {product.image && (
                  <img
                    src={`http://localhost:5000/${product.image.filePath}`}
                    alt="Product"
                    className="product-img"
                  />
                )}
              </div>
              <div className="product-details">
                <h3 className="product-name">
                  {product.productName}
                  <span className="status-circle"></span>
                </h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: ${product.price}</p>
                <p className="product-size">Size: {product.size}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedProduct && (
        <div
          ref={formRef}
          className={`add-to-cart-form ${formVisible ? "active" : ""}`}
        >
          <h3>Add to Cart</h3>
          <p>Product: {selectedProduct.productName}</p>
          <div>
            <label>
              <input
                type="radio"
                value="inch"
                checked={isInch}
                onChange={() => setIsInch(true)}
              />
              Inch
            </label>
            <label>
              <input
                type="radio"
                value="sqft"
                checked={!isInch}
                onChange={() => setIsInch(false)}
              />
              Sq.ft
            </label>
          </div>
          <input
            type="number"
            placeholder="Enter Width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleAddAndGoToCart}>Add & Go to Cart</button>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
