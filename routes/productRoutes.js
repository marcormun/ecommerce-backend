const router = require('express').Router();
const productController = require('../controllers/productController');
const isAdmin = require('../middlewares/isAdmin');
const verifyToken = require('../middlewares/verifyToken');

router.get('/products', productController.getAllProducts);
router.get('/products/id/:id', productController.getProductById);
router.get('/products/name/:name', productController.getProductByName);
router.get('products/provider/name', productController.getProductByProviderName);
router.post('/products', verifyToken, isAdmin, productController.addProduct);
router.put('/products/id/:id', productController.modifyProductStockById);
router.delete('/products/id/:id',productController.deleteProductById);

module.exports = router;