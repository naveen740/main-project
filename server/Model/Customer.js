const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    walletBalance: {
        type: Number,
        default: 0
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
















// const mongoose = require('mongoose');

// const customerSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// const Customer = mongoose.model('Customer', customerSchema);

// module.exports = Customer;
