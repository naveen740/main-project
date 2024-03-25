import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProductForm = ({ product, onCancel, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    productName: "",
    category: "",
    price: 0,
    stock: 0,
    image: null,
    description: "", // New state variable for product description
  });

  // Fetch existing product data when the component mounts or productId changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${product._id}`
        );
        const productData = response.data;

        // Update product data in the state
        setUpdatedProduct({
          productName: productData.productName,
          category: productData.category && productData.category.category, // Use category name instead of ID
          price: productData.price,
          stock: productData.stock,
          description: productData.description || "", // Set description if available
          image: null, // Set to null initially
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // Call fetchProduct only if product._id is defined
    if (product._id) {
      fetchProduct();
    }
  }, [product._id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUpdatedProduct({
        ...updatedProduct,
        [e.target.name]: e.target.files[0],
      });
    } else {
      const { name, value } = e.target;
      setUpdatedProduct({
        ...updatedProduct,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("productName", updatedProduct.productName);
      formData.append("category", product.category._id); // Use category ID for update
      formData.append("price", updatedProduct.price);
      formData.append("stock", updatedProduct.stock);
      formData.append("description", updatedProduct.description);
      if (updatedProduct.image) {
        formData.append("image", updatedProduct.image);
      }

      // Make a PUT request to update the product
      await axios.put(
        `http://localhost:5000/api/products/${product._id}`,
        formData
      );

      // Call onUpdate to trigger any necessary actions after successful update
      onUpdate();
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    // Call onCancel function to handle cancellation
    onCancel();
  };

  return (
    <div className="edit-form-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={updatedProduct.productName}
          onChange={handleChange}
          required
        />
        <label htmlFor="productCategory">Category:</label>
        <input
          type="text"
          id="productCategory"
          name="category"
          value={updatedProduct.category}
          onChange={handleChange}
          required
        />
        <label htmlFor="productPrice">Price:</label>
        <input
          type="number"
          id="productPrice"
          name="price"
          value={updatedProduct.price}
          onChange={handleChange}
          required
        />
        <label htmlFor="productStock">Stock:</label>
        <input
          type="number"
          id="productStock"
          name="stock"
          value={updatedProduct.stock}
          onChange={handleChange}
          required
        />
        <label htmlFor="productDescription">Description:</label>{" "}
        {/* Add description field */}
        <textarea
          id="productDescription"
          name="description"
          value={updatedProduct.description}
          onChange={handleChange}
        />
        <label htmlFor="productImage">Image:</label>
        <input
          type="file"
          id="productImage"
          name="image"
          accept="image/*"
          onChange={handleChange} // Ensure this is correctly bound
        />
        {/* Cancel button */}
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        {/* Update button */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
