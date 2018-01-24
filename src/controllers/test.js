const mongoose = require('mongoose');

const Test = new mongoose.Schema({
  result: {type: String, required: true},
});

module.exports = mongoose.model('Test', Test, 'Test');