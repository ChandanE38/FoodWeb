const User = require('../models/User');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getUserCart = async (req, res) => {
  try {
    // User is available in req.user due to authMiddleware
    const user = await User.findById(req.user.id).select('cart');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.cart);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Add item to cart or update quantity
// @route   POST /api/cart
// @access  Private
exports.addItemToCart = async (req, res) => {
  const { menuItemId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if item already exists in cart
    const itemIndex = user.cart.findIndex(item => item.menuItemId.toString() === menuItemId);

    if (itemIndex > -1) {
      // Item exists, update quantity
      user.cart[itemIndex].quantity += quantity; // Add to existing quantity
    } else {
      // Item does not exist, add new item to cart
      user.cart.push({ menuItemId, quantity });
    }

    await user.save();
    res.json(user.cart);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:menuItemId
// @access  Private
exports.removeItemFromCart = async (req, res) => {
  const menuItemId = req.params.menuItemId;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Filter out the item to be removed
    user.cart = user.cart.filter(item => item.menuItemId.toString() !== menuItemId);

    await user.save();
    res.json(user.cart);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Clear user cart
// @route   DELETE /api/cart
// @access  Private
exports.clearUserCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.cart = []; // Empty the cart array

    await user.save();
    res.json({ msg: 'Cart cleared' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 