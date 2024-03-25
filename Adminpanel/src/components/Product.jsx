import React from "react";
import "./css/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faPenSquare,
} from "@fortawesome/free-solid-svg-icons";
import ProductTable from "./ProductTable";

function Product({ onAddButtonClick }) {
  return (
    <div className="product">
      <div className="content">
        <div className="head5">
          <p>Product</p>
        </div>
        <nav className="nav">
          <div className="group1">
            <button className="btn">Export</button>
            <button className="btn">Import</button>
          </div>
          <div className="group2">
            <button className="btn btn1">
              <FontAwesomeIcon
                icon={faPenSquare}
                style={{ marginRight: "10px" }}
              />
              Bulk Action
            </button>
            <button className="btn btn2">
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ marginRight: "10px" }}
              />
              Delete
            </button>
            <button className="btn btn3" onClick={onAddButtonClick}>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
              Add Product
            </button>
          </div>
        </nav>
        <div className="filter">
          <div className="form">
            <div className="gp1">
              <input
                type="text"
                placeholder="Search"
                style={{ padding: "4px 12px" }}
              />
              <select id="category" name="category">
                <option value="">Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
              </select>
              <select id="price" name="price">
                <option value="">Price</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
              </select>
            </div>
            <div className="fil">
              <button type="submit">Filter</button>
              <button type="reset" className="btn2">
                Reset
              </button>
            </div>
          </div>
        </div>
        <ProductTable />
        {/* <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" id="selectAll" />
              </th>
              <th>PRODUCT NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>SALE PRICE</th>
              <th>STOCK</th>
              <th>STATUS</th>
              <th>VIEW</th>
              <th>PUBLISHED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="product">
              <td>
                <input type="checkbox" className="productCheckbox" />
              </td>
              <td>Product Name 1</td>
              <td>Category 1</td>
              <td>$99.99</td>
              <td>$89.99</td>
              <td>In Stock</td>
              <td>Active</td>
              <td>
                <button>View</button>
              </td>
              <td>Yes</td>
              <td> Actions Buttons Here</td>
            </tr>
            <tr className="product">
              <td>
                <input type="checkbox" className="productCheckbox" />
              </td>
              <td>Product Name 2</td>
              <td>Category 2</td>
              <td>$79.99</td>
              <td>$69.99</td>
              <td>Out of Stock</td>
              <td>Inactive</td>
              <td>
                <button>View</button>
              </td>
              <td>No</td>
              <td> Actions Buttons Here</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default Product;
