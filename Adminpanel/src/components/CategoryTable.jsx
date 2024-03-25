import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateCategory from "./UpdateCategory"; // Import the UpdateCategoryForm component
import "./css/CategoryTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      const categoriesWithImages = await Promise.all(
        response.data.map(async (category) => {
          try {
            const imageResponse = await axios.get(
              `http://localhost:5000/api/categories/${category._id}/image`
            );

            // Fetch subcategory names
            const subcategoryNames = await Promise.all(
              category.subcategories.map(async (subcategoryId) => {
                try {
                  const subcategoryResponse = await axios.get(
                    `http://localhost:5000/api/subcategories/${subcategoryId._id}`
                  );
                  return subcategoryResponse.data.name;
                } catch (error) {
                  console.error("Error fetching subcategory:", error);
                  return ""; // Return empty string if subcategory fetching fails
                }
              })
            );

            return {
              ...category,
              image: imageResponse.data.imagePath,
              subcategoryNames: subcategoryNames,
            };
          } catch (error) {
            console.error(
              "Error fetching data for category",
              category._id,
              ":",
              error
            );
            return { ...category, image: null, subcategoryNames: [] };
          }
        })
      );
      setCategories(categoriesWithImages);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteCategory = async (categoryId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmation) {
      try {
        await axios.delete(
          `http://localhost:5000/api/categories/${categoryId}`
        );
        setCategories(
          categories.filter((category) => category._id !== categoryId)
        );
        alert("Category successfully deleted.");
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="category-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CATEGORY</th>
            <th>SUBCATEGORIES</th> {/* Updated column header */}
            <th>IMAGE</th>
            <th>DESCRIPTION</th>
            <th style={{ textAlign: "center" }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.category}</td>
              <td>
                {category.subcategoryNames &&
                  category.subcategoryNames.join(", ")}
              </td>

              {/* Updated rendering for subcategories */}
              <td>
                {category.image && (
                  <img
                    src={`http://localhost:5000/${category.image}`}
                    alt="category"
                    style={{
                      width: "100px",
                      height: "auto",
                      borderRadius: "5px",
                    }}
                  />
                )}
              </td>
              <td>{category.description}</td>
              <td>
                <span className="fon">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={() => handleEditClick(category)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={() => deleteCategory(category._id)}
                    className="trash-icon"
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCategory && (
        <UpdateCategory
          category={selectedCategory}
          onCancel={() => setSelectedCategory(null)}
          onUpdate={() => {
            fetchCategories();
            setSelectedCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default CategoryTable;
