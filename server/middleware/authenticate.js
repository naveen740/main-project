// // middleware/authenticate.js
// const jwt = require('jsonwebtoken');
// const UserPage = require('../Model/Userpage2');

// const authenticate = async (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, 'your_secret_key');
//         const user = await UserPage.findById(decoded.id);

//         if (!user) {
//             return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }
// };

// module.exports = authenticate;
