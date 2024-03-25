// profileFormRoutes.js
const express = require('express');
const router = express.Router();
const profileFormController = require('../controllers/profileFormController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');
const ProfileForm=require('../Model/profileForm')

// Create profile form with image upload
router.post('/', authMiddleware, upload.single('image'), profileFormController.createProfileForm);
// Route to get the profile status for the authenticated user
router.get('/profile-status', authMiddleware, async (req, res) => {
    try {
      // Check if the user has filled the profile form
      const profileForm = await ProfileForm.findOne({ user: req.customerId });
      const profileFilled = !!profileForm; // Convert to boolean (true if profile form found, false otherwise)
      
      // Send response with profile status
      res.json({ profileFilled });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
module.exports = router;
