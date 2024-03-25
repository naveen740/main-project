const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
const authenticateToken = require('../middleware/authMiddleware');
// const stripe = require('stripe');
dotenv.config();

const stripe = require('stripe')

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// Route with JWT authentication middleware
// Route with JWT authentication middleware
router.post('/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    const { amount, customer_name, customer_address } = req.body; // Extract amount, customer_name, and customer_address from request body

    // Verify if the amount is provided
    if (!amount) {
      return res.status(400).json({ error: 'Missing amount parameter' });
    }

    // Create a Stripe client using the secret key from environment variable
    const stripeClient = stripe(stripeSecretKey);

    // Create a payment intent with Stripe, including customer's name and address if provided
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      description: `Payment for ${customer_name}`,
      shipping: { name: customer_name, address: { line1: customer_address } } // Include customer's name and address if provided
    });

    // Send the client secret back to the frontend
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
