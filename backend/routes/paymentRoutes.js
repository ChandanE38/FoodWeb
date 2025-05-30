const express = require('express');
const router = express.Router();

// Example payment route
router.post('/pay', (req, res) => {
    res.json({ message: 'Payment processed (mock)' });
});

module.exports = router; 