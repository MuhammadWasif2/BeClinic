const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/labfinal');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'labfinal',
    resave: false,
    saveUninitialized: true
}));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const orderRoutes = require('./lab-final-b/routes/order.routes');
app.use('/order', orderRoutes);

// Dummy cart for exam
app.get('/cart', (req, res) => {
    req.session.cart = {
        items: [
            { name: 'Pain Relief Tablets', price: 10, quantity: 2 },
            { name: 'Multivitamins', price: 15, quantity: 1 }
        ],
        totalPrice: 35
    };
    res.redirect('/order/preview');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
