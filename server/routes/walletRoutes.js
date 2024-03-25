const express = require('express');
const router = express.Router();
const cardValidator = require("card-validator");
const Customer = require('../Model/Customer');

// Middleware to verify authentication token
const authMiddleware = require('../middleware/authMiddleware');


// Function to check if a date is in the future
function isDateInFuture(expiryDate) {
    // Split the expiry date into month and year
    const [expiryMonth, expiryYear] = expiryDate.split('/');

    // Create a new Date object for the expiry date
    const expiryDateObj = new Date(`20${expiryYear}`, expiryMonth - 1); // Subtract 1 from the month to make it zero-based

    // Get the current date
    const currentDate = new Date();

    // Compare the expiry date with the current date
    return expiryDateObj > currentDate;
}

// Route to get wallet balance
router.get('/balance', authMiddleware, async (req, res) => {
    try {
      // Get customer ID from the request
      const customerId = req.customerId;
      
      // Find the customer by ID
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      // Return the wallet balance
      res.status(200).json({ balance: customer.walletBalance });
    } catch (error) {
      console.error('Error fetching balance:', error);
      res.status(500).json({ error: 'Failed to fetch balance. Please try again.' });
    }
  });

// Route for processing payment
router.post('/process-payment', authMiddleware, async (req, res) => {
    try {
        console.log(req.body);

        const { amount, cardDetails } = req.body;
        const { cardNumber, expiryDate, cvv } = cardDetails;
        const customerId = req.customerId;
        console.log(customerId)
        console.log(cardNumber)
        console.log(expiryDate)
        console.log(cvv)

        // Validate card details
        const cardValidation = cardValidator.number(cardNumber);
        if (!cardValidation.isValid) {
            return res.status(400).json({ error: 'Invalid card number' });
        }
        console.log('valid successfully 1')

        // Parse and format the expiration date
        const expiryDateParts = expiryDate.split('/');
        const expiryMonth = expiryDateParts[0];
        const expiryYear = expiryDateParts[1];
        const formattedExpiryDate = `${expiryMonth}/${expiryYear}`;

        // Validate the expiration date
        const expiryValidation = cardValidator.expirationDate(expiryDate);
        if (!expiryValidation.isValid || !isDateInFuture(expiryDate)) {
            return res.status(400).json({ error: 'Invalid expiry date' });
        }
        console.log('valid successfully 2')

        const cvvValidation = cardValidator.cvv(cvv);
        if (!cvvValidation.isValid) {
            return res.status(400).json({ error: 'Invalid CVV' });
        }
        console.log('valid successfully 3')

        // Convert amount to float
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Process payment and update wallet balance
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
    
        // Update wallet balance
        customer.walletBalance += parsedAmount;
        await customer.save();
    
        res.status(200).json({ balance: customer.walletBalance });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Failed to process payment. Please try again.' });
    }
});


router.post('/update-balance', authMiddleware, async (req, res) => {
    try {
      // Access authenticated customer's ID from the request object
      const customerId = req.customerId;
  
      // Assuming the amount to be deducted is sent in the request body
      const { amount } = req.body;
  
      // Check if the amount is valid
      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }
  
      // Fetch the customer from the database
      const customer = await Customer.findById(customerId);
  
      // Check if the customer exists
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      // Check if the customer has sufficient balance
      if (customer.walletBalance < parseFloat(amount)) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
  
      // Deduct the amount from the wallet balance
      customer.walletBalance -= parseFloat(amount);
      await customer.save();
  
      // Respond with the updated wallet balance
      res.status(200).json({ balance: customer.walletBalance });
    } catch (error) {
      console.error('Error updating wallet balance:', error);
      res.status(500).json({ error: 'Failed to update wallet balance. Please try again.' });
    }
  });

  

module.exports = router;
