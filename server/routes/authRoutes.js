const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const User = require('../Model/User');

// Route for user registration
router.post('/register', async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user with the data from the request body and hashed password
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword // Store the hashed password in the database
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Send back the saved user data
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Route for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // If the credentials are valid, return the user data
      res.status(200).json(user);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
