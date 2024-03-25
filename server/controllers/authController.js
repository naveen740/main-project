const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../Model/Customer');
const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if the email already exists
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new Customer({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate token with expiration time (e.g., 1 hour)
    const token = jwt.sign({ customerId: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Export the secret key for use in other files if needed
module.exports.secretKey = secretKey;
