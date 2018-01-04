const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

User.pre('save', function(next) {
  const user = this;

  if(user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
              user.password = hash;
              next();
          });
      });
  } else {
      next();
  }
});

User.methods.validatePassword = function (password) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) { 
        return reject(err) ;
      }
      resolve(isMatch);
    });
  });
};

User.methods.generateToken = function () {
  const user = this;

  return jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: process.env.JWT_TIMEOUT });
};

module.exports = mongoose.model('User', User, 'User');
