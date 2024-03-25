const mongoose = require('mongoose');

const profileFormSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Reference to the Customer model
    required: true
  },
  companyName: String,
  whatsappNumber: String,
  city: String,
  state: String,
  billingDetails: String,
  shippingDetails: String,
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  }
});

const ProfileForm = mongoose.model('ProfileForm', profileFormSchema);

module.exports = ProfileForm;
