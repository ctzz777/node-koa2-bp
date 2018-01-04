const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

User.methods.generateToken = function () {
  const user = this;
  return jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: process.env.JWT_TIMEOUT });
};

module.exports = mongoose.model('User', User, 'User');