const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const User = require('../models/User');
const crypto = require('crypto');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payment/order
// @access  Private (requires authentication)
exports.createOrder = async (req, res) => {
  const { amount, currency } = req.body;
  const userId = req.user.id; // Get user ID from authenticated request

  try {
    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency,
      receipt: crypto.randomBytes(10).toString('hex'), // Unique receipt ID
    };

    const order = await instance.orders.create(options);

    // Save payment details to database with 'pending' status
    const payment = new Payment({
      user: userId,
      order: order.id, // Store Razorpay order ID
      paymentMethod: 'Razorpay', // Assuming Razorpay
      amount: amount,
      currency,
      transactionId: 'pending', // Placeholder until payment is verified
      status: 'pending',
    });
    await payment.save();

    res.json({ orderId: order.id, currency: order.currency, amount: order.amount });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payment/verify
// @access  Private (requires authentication)
exports.verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${orderId}|${paymentId}`);
  const digest = shasum.digest('hex');

  if (digest === signature) {
    // Payment is successful, update payment status in database
    try {
      const payment = await Payment.findOneAndUpdate(
        { order: orderId },
        { $set: { transactionId: paymentId, status: 'completed' } },
        { new: true }
      );

      // Optionally, update user's cart or create an order here

      res.json({ msg: 'Payment successful', payment });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  } else {
    // Payment verification failed
    try {
      // Optionally, update payment status to 'failed' in database
      await Payment.findOneAndUpdate(
        { order: orderId },
        { $set: { status: 'failed' } },
        { new: true }
      );
      res.status(400).json({ msg: 'Payment verification failed' });
    } catch (err) {
       console.error(err.message);
       res.status(500).send('Server error');
    }
  }
}; 