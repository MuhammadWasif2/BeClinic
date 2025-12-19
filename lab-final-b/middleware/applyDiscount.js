module.exports = function applyDiscount(req, res, next) {
    const cart = req.session.cart;
    if (!cart) return next();

    const coupon = req.query.coupon || req.body.coupon;

    if (coupon === 'SAVE10') {
        req.discount = 10;
        req.discountedTotal = cart.totalPrice * 0.9;
    }

    next();
};
