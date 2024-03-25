const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Checkout = require('../Model/Checkout');
const Order = require('../Model/Order');



// Route to fetch order details by ID
router.get('/:orderId', authMiddleware, async (req, res) => {
  try {
    // const customerId = req.customerId;
    const orderId = req.params.orderId;

    // Find the order by ID and customer ID
    const order = await Checkout.findOne({ _id: orderId});

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Failed to fetch order details. Please try again.' });
  }
});



// // Route to get all orders for a specific customer
// router.get('/myorder', authMiddleware, async (req, res) => {
//   try {
//     const customerId = req.customerId;

//     // Find all orders for the given customer ID
//     const orders = await Checkout.find({ customer: customerId });

//     // Return the orders
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ error: 'Failed to fetch orders. Please try again.' });
//   }
// });
// POST route for checkout
// Route for handling checkout
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      city,
      country,
      zipCode,
      paymentMethod,
      totalPrice,
      orderSummary
    } = req.body;

    const customerId = req.customerId;

    // Generate a unique invoice number
    const invoice = generateInvoiceNumber();

    // Create a new checkout instance
    const checkout = new Checkout({
      invoice,
      orderPlacedDate: new Date(),
      customer: customerId,
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      city,
      country,
      zipCode,
      paymentMethod,
      totalPrice,
      orderSummary
    });

    // Save the checkout instance to the database
    await checkout.save();

    // Remove cart items associated with the user
    await Order.deleteMany({ customer: customerId });


    // Return success response with the newly created checkout data and order ID
    res.status(201).json({ message: 'Order placed successfully!', checkout, orderId: checkout._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order. Please try again.' });
  }
});


// Function to generate a unique 5-digit invoice number
function generateInvoiceNumber() {
  const min = 10000; // Minimum 5-digit number
  const max = 99999; // Maximum 5-digit number
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

module.exports = router;
