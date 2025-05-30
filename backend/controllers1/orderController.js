const Order = require('../models/Order');
const User = require('../models/User');
// Assuming you have a MenuItem model to fetch item details
// const MenuItem = require('../models/MenuItem');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    // Get order details from request body
    const { orderItems, shippingAddress, paymentMethod, totalAmount, paymentResult } = req.body;

    // Ensure orderItems is not empty
    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    // Create a new order
    const order = new Order({
      user: req.user.id, // User ID from authenticated request
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      paymentResult, // Include payment result if available
      // status will default to 'Pending' as defined in the model
    });

    // Save the order to the database
    const createdOrder = await order.save();

    // Optionally, clear the user's cart after successful order creation
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();

    res.status(201).json(createdOrder);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    // Find orders belonging to the logged-in user
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }); // Sort by creation date descending

    res.json(orders);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (or Admin)
exports.getOrderById = async (req, res) => {
  try {
    // Find order by ID and populate user (excluding password)
    const order = await Order.findById(req.params.id).populate('user', '-password');

    if (order) {
      // Ensure the logged-in user is the owner of the order (optional but recommended for non-admin)
      if (order.user._id.toString() !== req.user.id) {
         return res.status(401).json({ message: 'Not authorized to view this order' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add other order-related controller functions as needed (e.g., update order status by admin) 