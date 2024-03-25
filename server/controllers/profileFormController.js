const ProfileForm = require('../Model/profileForm');
const Image = require('../Model/Image');

// Create profile form for logged-in user
exports.createProfileForm = async (req, res) => {
  const customerId = req.customerId;
  const {
    companyName,
    whatsappNumber,
    city,
    state,
    billingDetails,
    shippingDetails,
  } = req.body;
   // Retrieved from authMiddleware

  try {
    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Retrieve the image information from the request file
    const { filename, path } = req.file;

    // Create new image instance
    const image = new Image({
      filename,
      filePath: path
    });
    await image.save();

    // Create profile instance
    const profile = new ProfileForm({
      user: customerId,
      companyName,
      whatsappNumber,
      city,
      state,
      billingDetails,
      shippingDetails,
      image: image._id // Associate the image with the user's profile
    });
    await profile.save();

    // Respond with success message
    res.status(201).json({ message: 'Profile form created successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error creating profile form:', error);
    res.status(500).json({ message: 'Failed to create profile form' });
  }
};
