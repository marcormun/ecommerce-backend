const router = require('express').Router();
const providerController = require('../controllers/providerController');

router.get('/providers', providerController.getAllProviders);
router.get('/providers/id/:id', providerController.getProviderById);
router.get('/providers/name/:name', providerController.getProviderByName);
router.post('/providers', providerController.createProvider);
router.put('/providers/id/:id', providerController.modifyProductById);
router.delete('providers/id/:id', providerController.deleteProviderById);

module.exports = router;