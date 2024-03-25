
const Customer = require('../Model/Customer');

exports.getProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customerId).select('-password');
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.customerId, req.body);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
