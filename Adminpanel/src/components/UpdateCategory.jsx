import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/UpdateCategory.css";
const UpdateCategoryForm = ({ category, onCancel, onUpdate }) => {
  const [updatedCategory, setUpdatedCategory] = useState({
    category: "",
    description: "", // New state variable for category description
    image: null,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/categories/${category._id}`
        );
        const categoryData = response.data;

        setUpdatedCategory({
          category: categoryData.category,
          description: categoryData.description || "", // Set description if available
          image: null,
        });
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    if (category._id) {
      fetchCategory();
    }
  }, [category._id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUpdatedCategory({
        ...updatedCategory,
        [e.target.name]: e.target.files[0],
      });
    } else {
      const { name, value } = e.target;
      setUpdatedCategory({
        ...updatedCategory,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", updatedCategory.category);
      formData.append("description", updatedCategory.description);
      if (updatedCategory.image) {
        formData.append("image", updatedCategory.image);
      }

      await axios.put(
        `http://localhost:5000/api/categories/${category._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpdate();
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="edit-form-container">
      <h2>Update Category</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="categoryName">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          name="category"
          value={updatedCategory.category}
          onChange={handleChange}
          required
        />
        <label htmlFor="categoryDescription">Description:</label>
        <textarea
          id="categoryDescription"
          name="description"
          value={updatedCategory.description}
          onChange={handleChange}
        />
        <label htmlFor="categoryImage">Image:</label>
        <input
          type="file"
          id="categoryImage"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;

// import React, { useState } from "react";
// import axios from "axios";
// import "./css/UpdateCategory.css"; // Import CSS file for styling

// const UpdateCategoryForm = ({ category, onCancel, onUpdate }) => {
//   const [updatedCategory, setUpdatedCategory] = useState({
//     category: category.category,
//     subcategory: category.subcategories
//       ? category.subcategories.map((sub) => sub.name).join(", ")
//       : "",
//     description: category.description,
//     image: null,
//   });

//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setUpdatedCategory({
//         ...updatedCategory,
//         [e.target.name]: e.target.files[0],
//       });
//     } else {
//       const { name, value } = e.target;
//       setUpdatedCategory({
//         ...updatedCategory,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("category", updatedCategory.category);
//       formData.append(
//         "subcategory",
//         updatedCategory.subcategory.split(",").map((s) => s.trim())
//       );
//       formData.append("description", updatedCategory.description);
//       if (updatedCategory.image) {
//         formData.append("image", updatedCategory.image);
//       }
//       await axios.put(
//         `http://localhost:5000/api/categories/${category._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       onUpdate();
//       alert("Category updated successfully!");
//     } catch (error) {
//       console.error("Error updating category:", error);
//       alert("Failed to update category. Please try again later.");
//     }
//   };

//   return (
//     <div className="edit-form-container">
//       <h2>Update Category</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="categoryName">Category Name:</label>
//         <input
//           type="text"
//           id="categoryName"
//           name="category"
//           value={updatedCategory.category}
//           onChange={handleChange}
//           required
//         />
//         <label htmlFor="subcategory">Subcategory:</label>
//         <input
//           type="text"
//           id="subcategory"
//           name="subcategory"
//           value={updatedCategory.subcategory}
//           onChange={handleChange}
//           required
//         />
//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           name="description"
//           value={updatedCategory.description}
//           onChange={handleChange}
//           required
//         ></textarea>
//         <label htmlFor="image">Image:</label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//         />
//         <button type="submit">Update</button>
//         <button type="button" onClick={onCancel}>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateCategoryForm;
