// import React from "react";
// import "./css/category.css";

// function Category() {
//   return <div className="category">Category</div>;
// }

// export default Category;

import React from "react";
import "./css/product.css";
import "./css/category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faPenSquare,
} from "@fortawesome/free-solid-svg-icons";
import ProductTable from "./ProductTable";
import AddCategoryForm from "./AddCategoryForm";
import CategoryTable from "./CategoryTable";

function Category({ onAddButtonClick }) {
  return (
    <div className="product">
      <div className="content">
        <div className="head5">
          <p>Category</p>
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
              Add Category
            </button>
          </div>
        </nav>
        <div className="filter">
          <div className="form">
            <div className="gpu1">
              <input
                type="text"
                placeholder="Search"
                style={{ padding: "4px 12px", width: "100%" }}
              />
              <div className="fil">
                <button type="submit" style={{ width: "100%" }}>
                  Filter
                </button>
                <button type="reset" style={{ width: "100%" }} className="btn2">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        <CategoryTable />
      </div>
    </div>
  );
}

export default Category;
