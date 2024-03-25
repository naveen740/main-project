const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  },
  subcategories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Subcategory'
  }], // Array of subcategory names
  description: String, // New field for category description
  image: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Image'
  }// New field for storing the image filename
});




// Define the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
