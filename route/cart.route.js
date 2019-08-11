const express = require('express');
const controller = require('../controller/cart.controller');

const router = express.Router();

// router.get('/', controller.cart);
router.get('/add/:productId', controller.addToCart);

module.exports = router;