const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createOrder, getUserOrders, getOrderById } = require('../controllers/orderController');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', auth, createOrder);

// @route   GET /api/orders/myorders
// @desc    Get logged in user's orders
// @access  Private
router.get('/myorders', auth, getUserOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private (or Admin)
router.get('/:id', auth, getOrderById);

module.exports = router; 