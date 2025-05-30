const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { updateCartItemQuantity } = require('../controllers/authController');

router.put('/cart/update-quantity', auth, updateCartItemQuantity);

module.exports = router; 