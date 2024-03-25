const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ProfileForm = require('../Model/profileForm'); // Import your User model
const Customer = require('../Model/Customer'); // Import your User model

// Route to get user profile details
router.get('/profile', authMiddleware, async (req, res) => {
    try {
      const userId = req.customerId;
      const profile = await ProfileForm.findOne({ user: userId }).populate('image'); // Populate image field
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      
      // Fetch username from Customer model
      const customer = await Customer.findById(userId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      res.json({
        username: customer.username,
        companyName: profile.companyName,
        whatsappNumber: profile.whatsappNumber,
        city: profile.city,
        state: profile.state,
        billingDetails: profile.billingDetails,
        shippingDetails: profile.shippingDetails,
        image: profile.image // Assuming image is already populated
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Route to update user profile details
  router.put('/profile', authMiddleware, async (req, res) => {
    try {
      const userId = req.customerId;
      const updatedProfileData = req.body;
      const profile = await ProfileForm.findOneAndUpdate({ user: userId }, updatedProfileData, { new: true });
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(profile);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
