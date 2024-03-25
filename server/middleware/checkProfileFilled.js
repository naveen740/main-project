const ProfileForm = require('../Model/profileForm');

const checkProfileFilled = async (userId) => {
  try {
    // Check if there exists a profile form entry for the given user
    const profileForm = await ProfileForm.findOne({ user: userId });
    return !!profileForm; // Return true if profile form exists, false otherwise
  } catch (error) {
    console.error(error);
    throw new Error('Error checking profile form');
  }
};

module.exports = checkProfileFilled;
