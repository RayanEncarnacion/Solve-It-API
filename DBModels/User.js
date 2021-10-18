const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: 'Dev',
  },
  points: {
    type: Number,
    default: 0,
  },
  solved: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', userSchema);
