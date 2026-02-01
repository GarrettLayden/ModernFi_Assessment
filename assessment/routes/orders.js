const express = require('express');
const ordersController = require('../controllers/OrdersController');
const router = express.Router();

console.log(JSON.stringify(ordersController));

router.get('/get', ordersController.getOrders);

router.post('/create', ordersController.createOrder);

module.exports = router;