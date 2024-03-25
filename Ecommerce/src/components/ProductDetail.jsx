// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function ProductPage() {
//   const { categoryId } = useParams();
//   // console.log(categoryId);

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/products/${categoryId}`
//         );
//         const productsWithImages = await Promise.all(
//           response.data.map(async (product) => {
//             const imageResponse = await axios.get(
//               `http://localhost:5000/api/images/${product.image}`
//             );
//             const imagePath = imageResponse.data.imagePath;
//             return { ...product, imagePath };
//           })
//         );
//         setProducts(productsWithImages);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setError("Error fetching products. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchProducts(); // Fetch products when the component mounts
//   }, [categoryId]); // Include categoryId in the dependency array

//   return (
//     <div>
//       <h2>Products</h2>
//       {loading ? (
//         <p>Loading products...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div className="product-list">
//           {products.map((product) => (
//             <div key={product._id} className="product-item">
//               <h3>{product.productName}</h3>
//               <p>Price: ${product.price}</p>
//               <p>Size: {product.size}</p>
//               <div className="product-image">
//                 {product.imagePath && (
//                   <img
//                     src={`http://localhost:5000/${product.imagePath}`}
//                     alt="Product"
//                   />
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./css/AddOrderPage.css";
// import { Link } from "react-router-dom";

// function AddOrderPage() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/categories");
//       setCategories(response.data);
//       // Set the default category to the first category in the list
//       if (response.data.length > 0) {
//         setSelectedCategory(response.data[0]);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setError("Error fetching categories. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <div>
//       <h2>Add Order</h2>
//       {loading ? (
//         <p>Loading categories...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div className="add-ctg">
//           {categories.map((category) => (
//             <div key={category._id}>
//               <button
//                 onClick={() => handleCategorySelect(category)}
//                 className={`category-button ${
//                   selectedCategory && selectedCategory._id === category._id
//                     ? "selected-category"
//                     : ""
//                 }`}
//               >
//                 {category.category}
//               </button>
//               {selectedCategory && selectedCategory._id === category._id && (
//                 <ul>
//                   {category.subcategories.map((subcategory) => (
//                     <li key={subcategory._id}>
//                       <Link to={`/products/${subcategory._id}`}>
//                         {subcategory.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddOrderPage;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
// import AddOrderPage from './components/AddOrder';
// import Home from './components/Home';
// import ImageSlider from './components/ImageSlider';
// import Logo from './components/logo';
// import ProductDetail from './components/ProductDetail';
// import ProductPage from './components/ProductPage';

// function App() {
//   // Define selectedProducts state
//   const [selectedProducts, setSelectedProducts] = useState([]);

//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/add-order" element={<AddOrderPageWithSlider setSelectedProducts={setSelectedProducts} />} />
//           {/* <Route path="/product/:subcategoryId" element={<ProductDetailPage />} /> */}
//           {/* <Route path="/product/:categoryId" element={<ProductDetailPage />} /> */}
//           <Route path="/products/:categoryId" element={<ProductDetailPage />} /> {/* Fixed route */}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// // Parent component for the home page
// function HomePage() {
//   return (
//     <div>
//       <Logo />
//       <Home />
//       <ImageSlider />
//     </div>
//   );
// }

// // Parent component for the add order page with slider
// function AddOrderPageWithSlider({ setSelectedProducts }) {
//   return (
//     <div>
//       <AddOrderPage setSelectedProducts={setSelectedProducts} />
//     </div>
//   );
// }

// // ProductDetailPage component receives categoryId from URL params
// function ProductDetailPage() {
//   const { categoryId } = useParams();

//   return (
//     <div>
//       <ProductPage categoryId={categoryId} />
//     </div>
//   );
// }

// export default App;

// const express = require('express');
// const multer = require('multer');
// const Product = require('../Model/Product');
// const Category = require('../Model/Category');
// const Image = require('../Model/Image');
// const Subcategory=require('../Model/SubCategory')

// const fs = require('fs');
// const path = require('path');

// const router = express.Router();

// // Route to fetch products based on subcategory
// router.get('/products', async (req, res) => {
//   try {
//     const { startIndex, endIndex, subcategory } = req.query;

//     let query = Product.find();

//     if (subcategory) {
//       query = query.find({ 'category.subcategories': subcategory });
//     }

//     // Apply pagination
//     const products = await query
//       .skip(parseInt(startIndex))
//       .limit(parseInt(endIndex) - parseInt(startIndex))
//       .populate('category'); // Populate category information for each product

//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to fetch products by category ID
// router.get('/products/:categoryId', async (req, res) => {
//   const categoryId = req.params.categoryId;

//   try {
//     // Assuming Product model has a field named categoryId
//     // const products = await Product.find({ categoryId });
//     const products = await Product.find({ subcategory: categoryId });

//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Error fetching products. Please try again later." });
//   }
// });

// // router.get('/images/:imageId', async (req, res) => {
// //   try {
// //     const { imageId } = req.params;
// //     const image = await Image.findById(imageId);
// //     if (!image) {
// //       return res.status(404).json({ error: 'Image not found' });
// //     }
// //     // Send the image data as response
// //     res.set('Content-Type', image.contentType); // Set content type header
// //     res.send(image.data);
// //   } catch (error) {
// //     console.error('Error fetching image:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });

// // // Route to fetch products by subcategory ID
// // router.get('/product', async (req, res) => {
// //   try {
// //     // Extract the subcategory ID from the query parameters
// //     const { subcategory } = req.query;

// //     // Query the database for products related to the specified subcategory
// //     const products = await Product.find({ subcategory });

// //     // Send the products as a response
// //     res.json(products);
// //   } catch (error) {
// //     // If an error occurs, send a 500 status code and the error message
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // Route to fetch products based on subcategory ID
// // router.get('/products', async (req, res) => {
// //   const { subcategory } = req.query;
// //   try {
// //     const products = await Product.find({ subcategory });
// //     res.json(products);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Internal Server Error' });
// //   }
// // });

// // Route to get products for a particular subcategory
// router.get('/prod', async (req, res) => {
//   const { subcategory } = req.query;
//   try {
//     // Find products that belong to the specified subcategory
//     const products = await Product.find({ subcategory });
//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Route to fetch products based on subcategory ID
// router.get("/product/:subcategoryId", async (req, res) => {
//   const { subcategoryId } = req.params;

//   try {
//     // Fetch products that belong to the specified subcategory
//     const products = await Product.find({ subcategory: subcategoryId });
//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Route to get all categories
// router.get('/categories', async (req, res) => {
//   try {
//     const categories = await Category.find().populate('subcategories'); // Populate the subcategories field
//     res.json(categories);
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // GET subcategory by ID
// router.get('/subcategories/:subcategoryId', async (req, res) => {
//   try {
//     const subcategoryId = req.params.subcategoryId;
//     const subcategory = await Subcategory.findById(subcategoryId);

//     if (!subcategory) {
//       return res.status(404).json({ error: 'Subcategory not found' });
//     }

//     // Return the subcategory data
//     res.json(subcategory);
//   } catch (error) {
//     console.error('Error fetching subcategory:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Route to get product details by ID
// router.get('/productdetail/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// router.get('/products/:productId/image', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.productId).populate('image');
//     if (!product || !product.image || !product.image.filePath) {
//       return res.status(404).json({ error: 'Product image not found' });
//     }
//     res.json({ imagePath: product.image.filePath });
//   } catch (error) {
//     console.error('Error fetching product image:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Route to handle requests for images
// // app.get('/api/images/:imageId', async (req, res) => {
// //   try {
// //     const imageId = req.params.imageId;
// //     const image = await Image.findById(imageId);

// //     if (!image) {
// //       return res.status(404).json({ error: 'Image not found' });
// //     }

// //     // Serve the image file
// //     res.set('Content-Type', image.contentType);
// //     res.send(image.data);
// //   } catch (error) {
// //     console.error('Error fetching image:', error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });

// // Route to serve images
// router.get('/images/:imageId', async (req, res) => {
//   try {
//     const { imageId } = req.params;
//     // Assuming you have a separate Image model
//     const image = await Image.findById(imageId);
//     if (!image) {
//       return res.status(404).json({ error: 'Image not found' });
//     }
//     // Assuming the image model contains the filePath field
//     const imagePath = image.filePath;
//     // Send the image path as JSON in the response
//     res.json({ imagePath });
//   } catch (error) {
//     console.error('Error fetching image:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Route to fetch category image by category ID
// router.get('/categories/:categoryId/image', async (req, res) => {
//   try {
//     const categoryId = req.params.categoryId;
//     const category = await Category.findById(categoryId);

//     if (!category || !category.image) {
//       return res.status(404).json({ error: 'Category image not found' });
//     }

//     const image = await Image.findById(category.image);

//     if (!image) {
//       return res.status(404).json({ error: 'Image not found' });
//     }

//     // Return the image data
//     res.json({ imagePath: image.filePath });
//   } catch (error) {
//     console.error('Error fetching category image:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // POST route to add a new product
// // Route to add a new product
// // Route to add a new product
// router.post('/products', upload.single('image'), async (req, res) => {
//   try {
//     // Parse product data from request body
//     const { productName, category, subcategory, price, stock, size } = req.body;

//     // Check if an image file was uploaded
//     if (!req.file) {
//       return res.status(400).json({ error: 'Image file is required' });
//     }

//     // Retrieve the image information from the request file
//     const { filename, path } = req.file;

//     // Check if the image already exists in the database
//     let existingImage = await Image.findOne({ filename });

//     // If the image does not exist, create a new Image instance and save it
//     if (!existingImage) {
//       existingImage = new Image({
//         filename: filename,
//         filePath: path
//       });
//       await existingImage.save();
//     }

//     // Check if the subcategory exists in the Subcategory model
//     let existingSubcategory = await Subcategory.findOne({ name: subcategory });

//     // If it doesn't exist, create a new subcategory
//     if (!existingSubcategory) {
//       existingSubcategory = new Subcategory({ name: subcategory });
//       await existingSubcategory.save();
//     }

//     // Check if the category exists in the Category model
//     let existingCategory = await Category.findOne({ category });

//     // If it doesn't exist, create a new category
//     if (!existingCategory) {
//       existingCategory = new Category({
//         category,
//         image: existingImage._id, // Associate the image with the category
//         subcategories: [existingSubcategory._id] // Store the subcategory ID in the category document
//       });
//       await existingCategory.save();
//     } else {
//       // Add the subcategory to the category's subcategories array if it's not already present
//       if (!existingCategory.subcategories.includes(existingSubcategory._id)) {
//         existingCategory.subcategories.push(existingSubcategory._id);
//       }

//       // Save the category changes
//       await existingCategory.save();
//     }

//     // Create product instance
//     const productData = {
//       productName,
//       category: existingCategory._id, // Use category ID
//       subcategory: existingSubcategory._id, // Use subcategory ID
//       price,
//       stock,
//       size,
//       image: existingImage._id // Use image ID
//     };

//     // Save product
//     const product = await Product.create(productData);

//     // Send response
//     res.status(201).json(product);
//   } catch (error) {
//     console.error('Error adding product:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;

// // Route to add a new category
// router.post('/categories', upload.single('image'), async (req, res) => {
//   try {
//     // Parse category data from request body
//     const { category, subcategory, description } = req.body;

//     // Check if category and subcategory are provided
//     if (!category) {
//       return res.status(400).json({ error: 'Category is required' });
//     }
//     if (!subcategory) {
//       return res.status(400).json({ error: 'Subcategory is required' });
//     }

//     // Check if an image file was uploaded
//     if (!req.file) {
//       return res.status(400).json({ error: 'Image file is required' });
//     }

//     // Retrieve the image information from the request file
//     const { filename, path } = req.file;

//     // Check if the image already exists in the database
//     let existingImage = await Image.findOne({ filename });

//     // If the image does not exist, create a new Image instance and save it
//     if (!existingImage) {
//       existingImage = new Image({
//         filename: filename,
//         filePath: path
//       });
//       await existingImage.save();
//     }

//     // Check if the category exists in the Category model
//     let existingCategory = await Category.findOne({ category }).populate('subcategories');

//     // If it doesn't exist, create a new category with the provided description and image
//     if (!existingCategory) {
//       // Check if the subcategory already exists
//       let existingSubcategory = await Subcategory.findOne({ name: subcategory });

//       // If the subcategory doesn't exist, create and save it
//       if (!existingSubcategory) {
//         existingSubcategory = new Subcategory({ name: subcategory });
//         await existingSubcategory.save();
//       }

//       // Create a new category with subcategory and image
//       existingCategory = new Category({
//         category,
//         description,
//         image: existingImage._id, // Associate the image with the category
//         subcategories: [existingSubcategory._id] // Add the subcategory ID to the category
//       });

//       // Save the category
//       await existingCategory.save();
//     } else {
//       // Check if the subcategory already exists in the category
//       const existingSubcategory = await Subcategory.findOne({ name: subcategory });

//       if (!existingSubcategory) {
//         // If the subcategory does not exist, create and save it
//         const newSubcategory = new Subcategory({ name: subcategory });
//         await newSubcategory.save();

//         // Add the subcategory ID to the category
//         existingCategory.subcategories.push(newSubcategory._id);

//         // Save the updated category
//         await existingCategory.save();
//       } else {
//         // If the subcategory exists, check if it's already associated with the category
//         if (!existingCategory.subcategories.includes(existingSubcategory._id)) {
//           // If not, add the subcategory ID to the category
//           existingCategory.subcategories.push(existingSubcategory._id);

//           // Save the updated category
//           await existingCategory.save();
//         }
//       }
//     }

//     // Send response
//     res.status(201).json(existingCategory);
//   } catch (error) {
//     console.error('Error adding category:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.put('/products/:id/image', upload.single('image'), async (req, res) => {
//   try {
//     // Extract product data from request body
//     const { productName, category, price, stock, size, subcategory } = req.body;
//     const productId = req.params.id;

//     // Check if an image file was uploaded
//     let imageId;
//     if (req.file) {
//       // Retrieve the image information from the request file
//       const { filename, path } = req.file;

//       // Check if the image already exists in the database
//       let existingImage = await Image.findOne({ filename });

//       // If the image does not exist, create a new Image instance and save it
//       if (!existingImage) {
//         existingImage = new Image({
//           filename: filename,
//           filePath: path
//         });
//         await existingImage.save();
//       } else {
//         // Update the image path if it already exists
//         existingImage.filePath = path;
//         await existingImage.save();
//       }

//       imageId = existingImage._id;
//     }

//     // Check if the category exists in the Category model
//     let existingCategory = await Category.findOne({ category });

//     // If it doesn't exist, create a new category with the provided subcategory
//     if (!existingCategory) {
//       existingCategory = new Category({
//         category,
//         image: imageId // Assign product image to category image
//       });
//     }

//     // Check if the subcategory exists in the Subcategory model
//     let existingSubcategory = await Subcategory.findOne({ name: subcategory });

//     // If it doesn't exist, create a new subcategory
//     if (!existingSubcategory) {
//       existingSubcategory = new Subcategory({ name: subcategory });
//       await existingSubcategory.save();
//     }

//     // Add the subcategory to the category if it's not already present
//     if (!existingCategory.subcategories.some(sub => sub.equals(existingSubcategory._id))) {
//       existingCategory.subcategories.push(existingSubcategory._id);
//     }

//     // Save the category changes
//     await existingCategory.save();

//     // Update product data
//     const productData = {
//       productName,
//       category: existingCategory._id, // Use category ID
//       subcategory: existingSubcategory._id,
//       price,
//       stock,
//       size,
//       image: imageId // Use image ID
//     };

//     // Update the product in the database
//     await Product.findByIdAndUpdate(productId, productData);

//     // Send response
//     res.status(200).json({ message: 'Product updated successfully' });
//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.put("/categories/:id/image", upload.single("image"), async (req, res) => {
//   try {
//     const categoryId = req.params.id;

//     // Parse updated category data from request body
//     const { category, subcategory, description } = req.body;

//     // Check if an image was uploaded
//     let imageId;
//     if (req.file) {
//       // Retrieve the image information from the request file
//       const { filename, path } = req.file;

//       // Check if the image already exists in the database
//       let existingImage = await Image.findOne({ filename });

//       // If the image does not exist, create a new Image instance and save it
//       if (!existingImage) {
//         existingImage = new Image({
//           filename: filename,
//           filePath: path
//         });
//         await existingImage.save();
//       } else {
//         // Update the image path if it already exists
//         existingImage.filePath = path;
//         await existingImage.save();
//       }

//       imageId = existingImage._id;
//     }

//     // Check if the category exists in the Category model
//     let existingCategory = await Category.findById(categoryId);

//     // If the category does not exist, return an error
//     if (!existingCategory) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     // Update the image for the category if an image was uploaded
//     if (imageId) {
//       existingCategory.image = imageId;
//     }

//     // Check if the subcategory exists in the Subcategory model
//     let existingSubcategory = await Subcategory.findOne({ name: subcategory });

//     // If it doesn't exist, create a new subcategory
//     if (!existingSubcategory) {
//       existingSubcategory = new Subcategory({ name: subcategory });
//       await existingSubcategory.save();
//     }

//     // Add the subcategory to the category if it's not already present
//     if (!existingCategory.subcategories.some(sub => sub.equals(existingSubcategory._id))) {
//       existingCategory.subcategories.push(existingSubcategory._id);
//     }

//     // Update category and description fields
//     existingCategory.category = category;
//     existingCategory.description = description;

//     // Save the category changes
//     await existingCategory.save();

//     return res.json({ message: "Category updated successfully" });
//   } catch (error) {
//     console.error("Error updating category:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // DELETE route to delete a product by ID
// router.delete('/products/:productId', async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     // Find the product by ID and delete it
//     await Product.findByIdAndDelete(productId);
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // DELETE route to delete a category by ID
// router.delete('/categories/:categoryId', async (req, res) => {
//   try {
//     const categoryId = req.params.categoryId;
//     // Find the category by ID and delete it
//     await Category.findByIdAndDelete(categoryId);
//     res.status(200).json({ message: 'Category deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting category:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
