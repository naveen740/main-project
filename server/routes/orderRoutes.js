const express = require('express');
const router = express.Router();
const Order = require('../Model/Order');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new order
router.post('/', authMiddleware, async (req, res) => {
    try {
      const { productId, width, height, quantity } = req.body;
      const customerId = req.customerId; // Assuming customerId is attached by the authentication middleware
      // console.log(productId)
      // console.log(width)
      // console.log(customerId)
      const order = new Order({
        customer: customerId,
        product: productId,
        width,
        height,
        quantity,
      });
      
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while processing your request' });
    }
  });
  
  // GET route to fetch order products for the authenticated user
// GET route to fetch order products for the authenticated user
router.get('/mycart', authMiddleware, async (req, res) => {
  try {
    // Find orders associated with the authenticated user
    const orders = await Order.find({ customer: req.customerId })
                               .populate('product')
                               .select('product width height quantity');

    res.json(orders); // Always send an array, even if it's empty
  } catch (error) {
    console.error("Error fetching order products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});






// Route to calculate total price for items in the cart
router.get('/total-price', authMiddleware, async (req, res) => {
  try {
    const customerId = req.customerId;

    // Find orders associated with the authenticated user
    const orders = await Order.find({ customer: customerId })
                              .populate('product')
                              .select('product width height quantity');

    // Calculate total price
    let totalPrice = 0;
    for (const order of orders) {
      const totalArea = order.width * order.height * order.quantity;
      const productPrice = totalArea * order.product.price;
      totalPrice += productPrice;
    }

    res.json({ totalPrice });
  } catch (error) {
    console.error("Error calculating total price:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

  
// Route to get total number of orders for a specific customer
router.get('/total-orders', authMiddleware, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({ customer: req.customerId });
    res.send({ totalOrders });
  } catch (error) {
    console.error('Error fetching total orders:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
