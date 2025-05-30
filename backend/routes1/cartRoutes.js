const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const {
  getUserCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// All routes are protected with auth middleware
router.get('/', auth, getUserCart);
router.post('/', auth, addToCart);
router.put('/:itemId', auth, updateQuantity);
router.delete('/:itemId', auth, removeFromCart);
router.delete('/', auth, clearCart);

module.exports = router; 