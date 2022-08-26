const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/products/name/:name', productController.getProductByName);
router.get('products/provider/name', productController.getProductByProviderName);
router.post('/products', productController.createProduct);

module.exports = router;