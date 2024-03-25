import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/ProductTable.css"; // Import CSS file
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassPlus,
  faPenToSquare,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import UpdateProductForm from "./UpdateProductForm"; // Import the UpdateProductForm component

const ProductTable = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const productsResponse = await axios.get(
        `http://localhost:5000/api/products?startIndex=${startIndex}&endIndex=${endIndex}`
      );
      const productsWithImages = await Promise.all(
        productsResponse.data.map(async (product) => {
          try {
            const imageResponse = await axios.get(
              `http://localhost:5000/api/products/${product._id}/image`
            );
            const imageData = imageResponse.data;
            const status = product.stock > 0 ? "Selling" : "Sold Out";
            return { ...product, image: imageData.imagePath, status };
          } catch (error) {
            console.error(
              "Error fetching image for product",
              product._id,
              ":",
              error
            );
            return { ...product, image: null, status: "Sold Out" };
          }
        })
      );
      setProducts(productsWithImages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleStatusChange = (productId, newStatus) => {
    axios
      .put(`http://localhost:5000/api/products/${productId}/status`, {
        status: newStatus,
      })
      .then(() => fetchProducts())
      .catch((error) => console.error("Error updating status:", error));
  };

  const handlePublishedChange = (productId, newPublished) => {
    axios
      .put(`http://localhost:5000/api/products/${productId}/published`, {
        published: newPublished,
      })
      .then(() => fetchProducts())
      .catch((error) =>
        console.error("Error updating published status:", error)
      );
  };

  const deleteProduct = async (productId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product successfully deleted.");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    // Update the checked state of all checkboxes in the table rows
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const totalPagesCount = Math.ceil(products.length / productsPerPage);
    setTotalPages(totalPagesCount);
  }, [products, productsPerPage]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleEditClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="prodtable">
      <table className="product-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectAll}
              />
            </th>
            <th>PRODUCT NAME</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>STOCK</th>
            <th className="centered">STATUS</th>
            <th className="centered">VIEW</th>
            <th className="centered">PUBLISHED</th>
            <th className="centered">ACTIONS</th>
            <th>IMAGE</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{product.productName}</td>
              <td>
                {product.category
                  ? product.category.category
                  : "Category Not Available"}
              </td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td className="centered">
                <span
                  className={`status ${
                    product.status === "Selling" ? "selling" : "sold-out"
                  }`}
                  style={{ width: "70px" }}
                >
                  {product.status}
                </span>
              </td>
              <td className="centered">
                <Link to={`/products/${product._id}`}>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassPlus}
                    style={{ fontSize: "20px", color: "lightgrey" }}
                  />
                </Link>
              </td>
              <td className="centered">
                <select
                  value={product.published ? "Yes" : "No"}
                  onChange={(e) =>
                    handlePublishedChange(product._id, e.target.value === "Yes")
                  }
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td className="centered">
                <span className="fon">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={() => handleEditClick(product)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={() => deleteProduct(product._id)}
                    className="trash-icon"
                  />
                </span>
              </td>
              <td>
                {product.image ? (
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.productName}
                    style={{
                      width: "100px",
                      height: "auto",
                      borderRadius: "5px",
                    }}
                  />
                ) : (
                  <span>No Image Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button onClick={nextPage}>Next</button>
      </div>
      {selectedProduct && (
        <UpdateProductForm
          product={selectedProduct}
          onCancel={() => setSelectedProduct(null)}
          onUpdate={() => {
            fetchProducts();
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductTable;
