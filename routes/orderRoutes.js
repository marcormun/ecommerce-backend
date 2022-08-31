const router = require('express').Router();
const orderController = require('../controllers/orderController');
const isAdmin = require('../middlewares/isAdmin');
const verifyToken = require('../middlewares/verifyToken');

router.get('/providers', verifyToken, isAdmin, orderController.getAllOrders);

module.exports = router;