const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Create Razorpay order - requires authentication
router.post('/order', authMiddleware, createOrder);

// Verify Razorpay payment - requires authentication  
router.post('/verify', authMiddleware, verifyPayment);

module.exports = router; 