const router = require('express').Router();
const orderController = require('../controllers/orderController');
const isAdmin = require('../middlewares/isAdmin');
const verifyToken = require('../middlewares/verifyToken');

router.get('/orders', verifyToken, isAdmin, orderController.getAllOrders);
router.get('/orders/user/:id', verifyToken, orderController.getAllOrdersByUser);
router.post('/orders', orderController.addOrder);
router.put('/orders/id/:id', orderController.modifyOrderStatusById);
router.delete('/orders/id/:id',orderController.deleteOrderById);
module.exports = router;