const jwt = require('jsonwebtoken');
const { secretKey } = require('../controllers/authController');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey); // No need to specify expiresIn here
    req.customerId = decodedToken.customerId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};












// const jwt = require('jsonwebtoken');
// const { secretKey } = require('../controllers/authController');

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, secretKey);
//     req.customerId = decodedToken.customerId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Authentication failed' });
//   }
// };
