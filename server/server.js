// server.js

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const {Product,Image} = require("./Model/Product"); // Import the Product model
const connectDb=require('./config/db')
const authRoutes =require('./routes/authRoutes')
const auth =require('./routes/auth')
// const profileRoutes =require('./routes/profileRoutes')
const profileFormRoutes =require('./routes/profileFormRoutes')
const logoRoutes=require('./routes/logoRoutes')
const orderRoutes=require('./routes/orderRoutes')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticate = require('./middleware/authenticate');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const checkout=require('./routes/checkout')
const checkoutRoute=require('./routes/checkoutRoutes')
const walletRoute=require('./routes/walletRoutes')
const editProfileRoutes = require('./routes/editProfileRoutes');
const imageRoutes = require('./routes/imageRoutes');
// const payment=require('./routes/payment')
const userRoutes = require('./routes/userRoutes'); 
const UserPage =require('./Model/UserPage')
const UserProfile = require('./Model/UserProfile');
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config(); // This loads the variables from .env into process.env
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Enable CORS
app.use(cors());

// Connect to MongoDB
connectDb();
app.use(bodyParser.json());
// Middleware to parse JSON bodies
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
// Mount product routes
app.use('/api', productRoutes);
// app.use('/api/userpage', profileRoutes);
app.use('/api/logo',logoRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/editProfile',editProfileRoutes)
app.use('/api/user', userRoutes);
app.use('/api/checkout',checkout)
app.use('/api/wallet',walletRoute)
app.use('/api/check-payment',checkoutRoute)
app.use('/api/profile-form', profileFormRoutes);
app.use('/api/eauth', auth);
app.use('/api/auth', authRoutes);
// app.use('/api/payment',payment)
// Error handling middleware



// Dummy endpoint to process payment
app.post("/api/payment/process", (req, res) => {
  // Here, you would handle the payment processing logic
  // For demonstration purposes, let's assume the payment is successful
  const { cardDetails, totalPrice } = req.body;
  
  // Mock payment processing
  if (cardDetails && totalPrice) {
    // Simulate processing time
    setTimeout(() => {
      res.status(200).json({ message: "Payment successful" });
    }, 2000); // Delay for 2 seconds to simulate processing
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
});
// Routes
// app.post('/api/payment/create-payment-intent', async (req, res) => {
//   try {
//     const { amount } = req.body;

//     // Create a payment intent with Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: 'usd',
//     });

//     // Send the client secret back to the frontend
//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// app.use('/api/products', productRoutes);
// app.use('/api', imageRoutes);
// Define API routes
// app.get('/api/products', async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.json(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// Define a route to handle POST requests for adding products
// app.post("/api/products", async (req, res) => {
//   try {
//     // Create a new product instance using the request body
//     const newProduct = new Product(req.body);
//     // Save the product to the database
//     await newProduct.save();
//     // Send a success response
//     res.json({ success: true, message: "Product added successfully" });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     // Send an error response
//     res.status(500).json({ error: "An error occurred while adding the product" });
//   }
// });

// Route handler to update status of a product
// Assuming you have already imported necessary modules and set up your Express app

// Route to handle PUT request for updating product status
app.put('/api/products/:productId/status', async (req, res) => {
  try {
    const productId = req.params.productId;
    const newStatus = req.body.status;

    // Find the product by ID and update its status
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { status: newStatus },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Status updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Route to handle PATCH request for updating published status
// Route to handle PUT request for updating published status
app.put('/api/products/:productId/published', async (req, res) => {
  try {
    const productId = req.params.productId;
    const newPublished = req.body.published;

    // Find the product by ID and update its published status
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { published: newPublished },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Published status updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating published status:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserPage.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the user has a profile
    const userProfile = await UserProfile.findOne({ user: user._id });

    // Determine if the user is new based on whether a profile exists
    const newUser = !userProfile;

    const token = jwt.sign({ id: user._id }, 'your_secret_key');
    return res.status(200).json({ message: 'Login successful', token, newUser });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await UserPage.create({ email, password });
      return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get user profile data
app.get('/profile', async (req, res) => {
  try {
    // Assuming you have authentication middleware to get user ID from token
    const userId = req.user.id;
    
    // Find user profile data using userId
    const userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({ userProfile });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update user profile data
app.post('/profile', async (req, res) => {
  try {
    // Assuming you have authentication middleware to get user ID from token
    const userId = req.user.id;

    // Update user profile data with the data sent in the request body
    const userProfile = await UserProfile.findOneAndUpdate(
      { user: userId },
      req.body,
      { new: true, upsert: true }
    );

    return res.status(200).json({ message: 'Profile updated successfully', userProfile });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
