const express = require('express');
const router = express.Router();
const UserProfile = require('../models/userProfile');

// Get user profile
router.get('/', async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ user: req.customerId });
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.patch('/', async (req, res) => {
  try {
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { user: req.customerId },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
