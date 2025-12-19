const express = require('express');
const router = express.Router();

// import Order model
const Order = require('../models/Order');

// import discount middleware
const applyDiscount = require('../middleware/applyDiscount');

// ===============================
// GET /order/preview
// ===============================
router.get('/preview', applyDiscount, (req, res) => {
    const cart = req.session.cart;

    // if cart empty, go back
    if (!cart || cart.items.length === 0) {
        return res.redirect('/cart');
    }

    // render preview page
    res.render('order/preview', {
        cartItems: cart.items,
        total: req.discountedTotal || cart.totalPrice,
        discount: req.discount || 0
    });
});

module.exports = router;
