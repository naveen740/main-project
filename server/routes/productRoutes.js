const express = require('express');
const multer = require('multer');
const Product = require('../Model/Product');
const Category = require('../Model/Category');
const Image = require('../Model/Image');
const Subcategory=require('../Model/SubCategory')

const fs = require('fs');
const path = require('path');

const router = express.Router();

// Route to fetch products based on subcategory
router.get('/products', async (req, res) => {
  try {
    const { startIndex, endIndex, subcategory } = req.query;

    let query = Product.find();

    if (subcategory) {
      query = query.find({ 'category.subcategories': subcategory });
    }

    // Apply pagination
    const products = await query
      .skip(parseInt(startIndex))
      .limit(parseInt(endIndex) - parseInt(startIndex))
      .populate('category'); // Populate category information for each product
      

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch existing product data
router.get('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    // Find the product by ID
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Send the product data
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/subcategories', async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/prod/:categoryId/:subcategoryId', async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.params;

    const products = await Product.find({
      'category': categoryId,
      'subcategory': subcategoryId
    }).populate('category').populate('subcategory').populate('image');

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch products by category ID
router.get('/products/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    // Assuming Product model has a field named categoryId
    // const products = await Product.find({ categoryId });
    const products = await Product.find({ subcategory: categoryId });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products. Please try again later." });
  }
});

// router.get('/images/:imageId', async (req, res) => {
//   try {
//     const { imageId } = req.params;
//     const image = await Image.findById(imageId);
//     if (!image) {
//       return res.status(404).json({ error: 'Image not found' });
//     }
//     // Send the image data as response
//     res.set('Content-Type', image.contentType); // Set content type header
//     res.send(image.data);
//   } catch (error) {
//     console.error('Error fetching image:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Route to fetch products by subcategory ID
// router.get('/product', async (req, res) => {
//   try {
//     // Extract the subcategory ID from the query parameters
//     const { subcategory } = req.query;

//     // Query the database for products related to the specified subcategory
//     const products = await Product.find({ subcategory });

//     // Send the products as a response
//     res.json(products);
//   } catch (error) {
//     // If an error occurs, send a 500 status code and the error message
//     res.status(500).json({ error: error.message });
//   }
// });

// Route to fetch products based on subcategory ID
// router.get('/products', async (req, res) => {
//   const { subcategory } = req.query;
//   try {
//     const products = await Product.find({ subcategory });
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// Route to get products for a particular subcategory
router.get('/prod', async (req, res) => {
  const { subcategory } = req.query;
  try {
    // Find products that belong to the specified subcategory
    const products = await Product.find({ subcategory });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// Route to fetch products based on subcategory ID
router.get("/product/:subcategoryId", async (req, res) => {
  const { subcategoryId } = req.params;

  try {
    // Fetch products that belong to the specified subcategory
    const products = await Product.find({ subcategory: subcategoryId });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Route to get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().populate('subcategories'); // Populate the subcategories field
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/categories/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET subcategory by ID
router.get('/subcategories/:subcategoryId', async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const subcategory = await Subcategory.findById(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    // Return the subcategory data
    res.json(subcategory);
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get product details by ID
router.get('/productdetail/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/products/:productId/image', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('image');
    if (!product || !product.image || !product.image.filePath) {
      return res.status(404).json({ error: 'Product image not found' });
    }
    res.json({ imagePath: product.image.filePath });
  } catch (error) {
    console.error('Error fetching product image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to handle requests for images
// app.get('/api/images/:imageId', async (req, res) => {
//   try {
//     const imageId = req.params.imageId;
//     const image = await Image.findById(imageId);

//     if (!image) {
//       return res.status(404).json({ error: 'Image not found' });
//     }

//     // Serve the image file
//     res.set('Content-Type', image.contentType);
//     res.send(image.data);
//   } catch (error) {
//     console.error('Error fetching image:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Route to serve images
router.get('/images/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    // Assuming you have a separate Image model
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    // Assuming the image model contains the filePath field
    const imagePath = image.filePath;
    // Send the image path as JSON in the response
    res.json({ imagePath });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Route to fetch category image by category ID
router.get('/categories/:categoryId/image', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);

    if (!category || !category.image) {
      return res.status(404).json({ error: 'Category image not found' });
    }

    const image = await Image.findById(category.image);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Return the image data
    res.json({ imagePath: image.filePath });
  } catch (error) {
    console.error('Error fetching category image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST route to add a new product
// Route to add a new product
// Route to add a new product
// router.post('/products', upload.single('image'), async (req, res) => {
//   try {
//     // Parse product data from request body including the description
//     const { productName, category, subcategory, price, stock, size, description } = req.body;

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
//       description, // Include the product description
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


router.post('/products', upload.single('image'), async (req, res) => {
  try {
    // Parse product data from request body including the description
    const { productName, category, subcategory, price, stock, size, description } = req.body;

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Retrieve the image information from the request file
    const { filename, path } = req.file;

    // Check if the image already exists in the database
    let existingImage = await Image.findOne({ filename });

    // If the image does not exist, create a new Image instance and save it
    if (!existingImage) {
      existingImage = new Image({
        filename: filename,
        filePath: path
      });
      await existingImage.save();
    }

    // Check if the subcategory exists in the Subcategory model
    let existingSubcategory = await Subcategory.findOne({ name: subcategory });

    // If it doesn't exist, create a new subcategory
    if (!existingSubcategory) {
      existingSubcategory = new Subcategory({ name: subcategory });
      await existingSubcategory.save();
    }

    // Check if the category exists in the Category model
    let existingCategory = await Category.findOne({ category });

    // If it doesn't exist, create a new category
    if (!existingCategory) {
      existingCategory = new Category({
        category,
        image: existingImage._id, // Associate the image with the category
        subcategories: [existingSubcategory._id] // Store the subcategory ID in the category document
      });
      await existingCategory.save();
    } else {
      // Add the subcategory to the category's subcategories array if it's not already present
      if (!existingCategory.subcategories.includes(existingSubcategory._id)) {
        existingCategory.subcategories.push(existingSubcategory._id);
      }

      // Save the category changes
      await existingCategory.save();
    }

    // Create product instance
    const productData = {
      productName,
      category: existingCategory._id, // Use category ID
      subcategory: existingSubcategory._id, // Use subcategory ID
      price,
      stock,
      size,
      description, // Include the product description
      image: existingImage._id // Use image ID
    };

    // Save product
    const product = await Product.create(productData);

    // Send response
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// module.exports = router;


// Create a new subcategory
router.post('/subcategories', async (req, res) => {
  const subcategory = new Subcategory({
    name: req.body.name,
  });

  try {
    const newSubcategory = await subcategory.save();
    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});









// Route to add a new category
router.post('/categories', upload.single('image'), async (req, res) => {
  try {
    // Parse category data from request body
    const { category, subcategory, description } = req.body;

    // Check if category and subcategory are provided
    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }
    if (!subcategory) {
      return res.status(400).json({ error: 'Subcategory is required' });
    }

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Retrieve the image information from the request file
    const { filename, path } = req.file;

    // Check if the image already exists in the database
    let existingImage = await Image.findOne({ filename });

    // If the image does not exist, create a new Image instance and save it
    if (!existingImage) {
      existingImage = new Image({
        filename: filename,
        filePath: path
      });
      await existingImage.save();
    }

    // Check if the category exists in the Category model
    let existingCategory = await Category.findOne({ category }).populate('subcategories');

    // If it doesn't exist, create a new category with the provided description and image
    if (!existingCategory) {
      // Check if the subcategory already exists
      let existingSubcategory = await Subcategory.findOne({ name: subcategory });

      // If the subcategory doesn't exist, create and save it
      if (!existingSubcategory) {
        existingSubcategory = new Subcategory({ name: subcategory });
        await existingSubcategory.save();
      }

      // Create a new category with subcategory and image
      existingCategory = new Category({
        category,
        description,
        image: existingImage._id, // Associate the image with the category
        subcategories: [existingSubcategory._id] // Add the subcategory ID to the category
      });

      // Save the category
      await existingCategory.save();
    } else {
      // Check if the subcategory already exists in the category
      const existingSubcategory = await Subcategory.findOne({ name: subcategory });

      if (!existingSubcategory) {
        // If the subcategory does not exist, create and save it
        const newSubcategory = new Subcategory({ name: subcategory });
        await newSubcategory.save();

        // Add the subcategory ID to the category
        existingCategory.subcategories.push(newSubcategory._id);

        // Save the updated category
        await existingCategory.save();
      } else {
        // If the subcategory exists, check if it's already associated with the category
        if (!existingCategory.subcategories.includes(existingSubcategory._id)) {
          // If not, add the subcategory ID to the category
          existingCategory.subcategories.push(existingSubcategory._id);
          
          // Save the updated category
          await existingCategory.save();
        }
      }
    }

    // Send response
    res.status(201).json(existingCategory);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});










// Route to update product data
router.put('/products/:productId', upload.single('image'), async (req, res) => {
  try {
    const productId = req.params.productId;
    // Find the product by ID
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product data with the request body
    product.productName = req.body.productName;
    product.category = req.body.category;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.description = req.body.description;

    // If a new image is uploaded, save it in the Image collection and update product image reference
    if (req.file) {
      const image = new Image({
        filename: req.file.filename,
        filePath: req.file.path
      });
      await image.save();
      product.image = image._id; // Update product image reference with the ObjectId of the saved image document
    }

    // Save the updated product
    await product.save();

    // Send the updated product data
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




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


// Update category route
router.put('/categories/:categoryId', upload.single('image'), async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    let category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Update category data with the request body
    category.category = req.body.category;
    category.description = req.body.description;

    // If a new image is uploaded, save it in the Image collection and update category image reference
    if (req.file) {
      const image = new Image({
        filename: req.file.filename,
        filePath: req.file.path
      });
      await image.save();
      category.image = image._id; // Update category image reference with the ObjectId of the saved image document
    }

    // Save the updated category
    category = await category.save();

    // Send the updated category data
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});








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



// DELETE route to delete a product by ID
router.delete('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    // Find the product by ID and delete it
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE route to delete a category by ID
router.delete('/categories/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    // Find the category by ID and delete it
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
