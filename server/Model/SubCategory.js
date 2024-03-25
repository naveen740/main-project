// subcategorySchema.js

const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  // Add any additional fields specific to subcategories here
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
