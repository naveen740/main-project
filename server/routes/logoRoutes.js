// userRoutes.js
const express = require('express');
const router = express.Router();
const ProfileForm = require('../Model/profileForm');
const Customer = require('../Model/Customer');
const authMiddleware = require('../middleware/authMiddleware');

// Route to retrieve user data
// Assuming this is your route or controller for the home page
router.get('/user', authMiddleware, async (req, res) => {
    try {
      // Retrieve the customerId from the request object
      const userId = req.customerId;
  
      // Retrieve the username from the Customer model
      const customer = await Customer.findById(userId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      const username = customer.username;
  
      // Retrieve the profile image from the ProfileForm model
      const profileForm = await ProfileForm.findOne({ user: userId }).populate('image');
      if (!profileForm) {
        return res.status(404).json({ message: 'ProfileForm not found' });
      }
      const image = profileForm.image;
  
      // Send the username and image data in the response
      res.status(200).json({ username, image });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;
