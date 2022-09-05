const router = require('express').Router();
const providerController = require('../controllers/providerController');
const isAdmin = require('../middlewares/isAdmin');
const verifyToken = require('../middlewares/verifyToken');

router.get('/providers', providerController.getAllProviders);
router.get('/providers/id/:id', providerController.getProviderById);
router.get('/providers/name/:name', providerController.getProviderByName);
router.post('/providers', verifyToken, isAdmin, providerController.createProvider);
router.put('/providers/id/:id', verifyToken, isAdmin, providerController.modifyProviderById);
router.delete('/providers/id/:id', verifyToken, isAdmin, providerController.deleteProviderById);

module.exports = router;