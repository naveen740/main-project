import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/ProductDetail.css";

const ProductDetail = ({ subcategoryId }) => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products related to the specified subcategory
        const response = await axios.get(
          `http://localhost:5000/api/product?subcategory=${subcategoryId}`
        );
        setProducts(response.data);

        // Fetch subcategory details
        const subcategoryResponse = await axios.get(
          `http://localhost:5000/api/subcategories/${subcategoryId}`
        );
        setSubcategories([subcategoryResponse.data.name]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [subcategoryId]);

  // Function to determine the status based on stock
  const getStatus = (stock) => {
    return stock > 0 ? "Selling" : "Sold Out";
  };

  return (
    <div className="product-detail-container">
      <h2 style={{ color: "white" }}>Product Detail</h2>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-info">
            <div className="pdinfo">
              <p>Product Name: {product.productName}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              {product.category && <p>Category: {product.category.category}</p>}
              {subcategories.length > 0 && (
                <div>
                  <p>Subcategories:</p>
                  <ul>
                    {subcategories.map((subcategory, index) => (
                      <li key={index}>{subcategory}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p>Status: {getStatus(product.stock)}</p>
              <p>Published: {product.published ? "Yes" : "No"}</p>
            </div>
            <div className="product-image">
              {product.image && (
                <img
                  src={`http://localhost:5000/api/images/${product.image}`}
                  alt="Product"
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No products found for this subcategory.</p>
      )}
    </div>
  );
};

export default ProductDetail;
