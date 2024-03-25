// routes/imageRoutes.js

const express = require('express');
const router = express.Router();
const {Product,Image} = require('../Model/Product');

// Route to get image for a specific product
router.get('/products/:productId/image', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product || !product.image || !product.image.filePath) {
      return res.status(404).json({ error: 'Product image not found' });
    }
    // Assuming the image path is stored in product.image.filePath
    res.sendFile(product.image.filePath);
  } catch (error) {
    console.error('Error fetching product image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
