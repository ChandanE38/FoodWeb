const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  razorpayOrderId: {
    type: String, // Razorpay order ID (string format)
    required: false
  },
  order: { // Optional: Link to an Order model if you create one later
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: false
  },
  paymentMethod: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'INR' // Indian Rupees for food delivery app
  },
  transactionId: {
    type: String, // ID from the payment gateway
    required: true
    // Removed unique constraint to allow multiple pending payments
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'refunded'], // Possible statuses
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  verifiedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Payment', PaymentSchema); 