// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const profileController = require('../controllers/profileController');

// Route to save profile data
router.post('/', authenticate, profileController.saveProfileData);

// Route to retrieve profile data
router.get('/', authenticate, profileController.getProfileData);

module.exports = router;
