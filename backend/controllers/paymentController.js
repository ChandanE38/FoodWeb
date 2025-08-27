const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const User = require('../models/User');
const crypto = require('crypto');

// Validate environment variables before initializing Razorpay
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error('❌ Razorpay configuration error:');
  console.error('   RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? '✅ Set' : '❌ Missing');
  console.error('   RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? '✅ Set' : '❌ Missing');
  console.error('   Please check your .env file and set actual Razorpay credentials.');
  console.error('   Get your keys from: https://dashboard.razorpay.com/app/keys');
  throw new Error('Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file.');
}

// Check for placeholder values
if (process.env.RAZORPAY_KEY_ID.includes('REPLACE') || process.env.RAZORPAY_KEY_SECRET.includes('REPLACE')) {
  console.error('❌ Razorpay credentials contain placeholder values.');
  console.error('   Please replace placeholder values with actual credentials from Razorpay dashboard.');
  throw new Error('Razorpay credentials contain placeholder values. Please set actual keys from Razorpay dashboard.');
}

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log('✅ Razorpay initialized successfully with key:', process.env.RAZORPAY_KEY_ID.substring(0, 15) + '...');

// @desc    Create Razorpay order
// @route   POST /api/payment/order
// @access  Private (requires authentication)
exports.createOrder = async (req, res) => {
  const { amount, currency = 'INR' } = req.body;
  const userId = req.user.id;

  try {
    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ msg: 'Invalid amount' });
    }

    // Validate Razorpay configuration
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay credentials not configured');
      return res.status(500).json({ msg: 'Payment gateway not configured' });
    }

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit
      currency,
      receipt: `receipt_${Date.now()}_${userId}`,
      payment_capture: 1,
      notes: {
        user_id: userId,
        order_type: 'food_delivery',
        timestamp: new Date().toISOString()
      }
    };

    const order = await instance.orders.create(options);

    // Save payment details to database with 'pending' status
    const payment = new Payment({
      user: userId,
      order: order.id,
      paymentMethod: 'Razorpay',
      amount: amount,
      currency,
      transactionId: 'pending',
      status: 'pending',
    });
    await payment.save();

    console.log(`Payment order created: ${order.id} for user: ${userId}`);

    res.status(201).json({ 
      orderId: order.id, 
      currency: order.currency, 
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID, // Return the key for frontend
      receipt: order.receipt
    });

  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).json({ msg: 'Failed to create payment order', error: err.message });
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payment/verify
// @access  Private (requires authentication)
exports.verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  try {
    // Validate required fields
    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ msg: 'Missing required payment verification data' });
    }

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${orderId}|${paymentId}`);
    const digest = shasum.digest('hex');

    if (digest === signature) {
      // Payment is successful, update payment status in database
      const payment = await Payment.findOneAndUpdate(
        { order: orderId },
        { 
          $set: { 
            transactionId: paymentId, 
            status: 'completed',
            verifiedAt: new Date()
          } 
        },
        { new: true }
      );

      if (!payment) {
        return res.status(404).json({ msg: 'Payment record not found' });
      }

      console.log(`Payment verified successfully: ${paymentId} for order: ${orderId}`);

      res.json({ 
        msg: 'Payment verified successfully', 
        payment: {
          id: payment._id,
          orderId: payment.order,
          paymentId: paymentId,
          amount: payment.amount,
          status: payment.status
        }
      });

    } else {
      // Payment verification failed
      await Payment.findOneAndUpdate(
        { order: orderId },
        { 
          $set: { 
            status: 'failed',
            failureReason: 'Signature verification failed'
          } 
        },
        { new: true }
      );
      
      console.log(`Payment verification failed for order: ${orderId}`);
      res.status(400).json({ msg: 'Payment verification failed - Invalid signature' });
    }
  } catch (err) {
    console.error('Error verifying payment:', err);
    res.status(500).json({ msg: 'Payment verification error', error: err.message });
  }
};