const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
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
  date: {
    type: Date,
    default: Date.now
  },
  cart: [ // Embedding cart directly in User model for simplicity
    {
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming menu items have ObjectId IDs
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
});

module.exports = mongoose.model('User', UserSchema); 