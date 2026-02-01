const express = require('express');
const ordersController = require('../controllers/OrdersController');
const router = express.Router();

router.get('/get', ordersController.getOrders);

router.post('/create', ordersController.createOrder);

module.exports = router;