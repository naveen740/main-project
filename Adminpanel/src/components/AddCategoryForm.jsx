import React, { useState } from "react";
import axios from "axios";
import "./css/AddProductForm.css"; // Import CSS file

const AddCategoryForm = ({ closeForm }) => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("description", description);
      formData.append("image", image);
      await axios.post("http://localhost:5000/api/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Reset form state after successful submission
      setCategory("");
      setSubcategory("");
      setDescription("");
      setImage(null);
      // Handle success
      alert("Category Added");
      window.location.reload();
    } catch (error) {
      console.error("Error adding category:", error);
      // Handle error
    }
  };

  const handleCloseForm = () => {
    closeForm(); // Call the closeForm function to close the form
  };

  return (
    <div className="add-product-container">
      <span className="exit-icon" onClick={handleCloseForm}>
        &times;
      </span>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="category"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          name="subcategory"
          placeholder="Subcategory Name(s) (comma-separated)"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="file-input-container">
          <label htmlFor="category-image" className="upload-button">
            Upload Image
          </label>
          <input
            type="file"
            id="category-image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          {image && <span className="file-name">{image.name}</span>}
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
