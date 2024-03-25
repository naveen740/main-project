import React, { useState } from "react";
import axios from "axios";
import "./css/AddProductForm.css"; // Import CSS file

const AddProductForm = ({ closeForm }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(""); // New state for product description

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("size", size);
    formData.append("image", image);
    formData.append("description", description); // Append description to form data

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Product Added Successfully");
      window.location.reload();
      // Handle success
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error
    }
  };

  const handleCloseForm = () => {
    closeForm(); // Call the closeForm function to close the form
  };

  return (
    <div className="add-product-container">
      {/* Apply container styling */}
      <span className="exit-icon" onClick={handleCloseForm}>
        &times;
      </span>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subcategory"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="text"
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <textarea
          placeholder="Product Description" // Add a textarea for the description
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="file-input-container">
          <label htmlFor="image" className="upload-button">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className="custom-file-input"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image && <span className="file-name">{image.name}</span>}
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
