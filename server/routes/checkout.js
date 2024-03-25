// routes/checkout.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../Model/Order');
const Checkout=require('../Model/Checkout')

// GET /api/checkout
router.get('/', authMiddleware, async (req, res) => {
  try {
    const customerId = req.customerId; // Accessing customerId from the request object
    // Fetch order details from MongoDB using customerId
    const orders = await Order.find({ customer: customerId });
    
    // Calculate total amount
    let totalPrice = 0;
    orders.forEach(order => {
      const totalArea = order.width * order.height * order.quantity;
      const productPrice = totalArea * order.product.price;
      totalPrice += productPrice;
      console.log(totalPrice)
    });

    res.json({ totalPrice });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Error fetching order details' });
  }
});

// Route to get all orders for a specific customer
router.get('/myorder', authMiddleware, async (req, res) => {
  try {
    const customerId = req.customerId;

    // Find all orders for the given customer ID
    const orders = await Checkout.find({ customer: customerId  });

    // Return the orders
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders. Please try again.' });
  }
});

module.exports = router;
