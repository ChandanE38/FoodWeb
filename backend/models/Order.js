const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem', // Assuming you have a MenuItem model
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      customizations: [
        {
          type: String,
        }
      ], // Optional: if items can have customizations
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  }, // Assuming a simple embedded address structure
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: { // Details from payment gateway
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  }, // Example fields, adjust based on your payment gateway
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps automatically
});

module.exports = mongoose.model('Order', OrderSchema); 