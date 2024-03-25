const mongoose = require('mongoose');

// Define a schema for the order summary items
const orderSummarySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

// Define the main checkout schema
const checkoutSchema = new mongoose.Schema({
  invoice: { type: String, unique: true, required: true },
  orderPlacedDate: { type: Date, default: Date.now },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  // Include the order summary schema as an array
  orderSummary: [orderSummarySchema]
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
