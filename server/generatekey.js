const crypto = require('crypto');

// Generate a random secret key
const generateRandomKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Print the generated key
console.log('Your random secret key:', generateRandomKey());
