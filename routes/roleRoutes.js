const router = require('express').Router();
const roleController = require('../controllers/roleController');

router.get('/providers', providerController.getAllProviders);
router.get('/providers/id/:id', providerController.getProviderById);
router.get('/providers/name/:name', providerController.getProviderByName);
router.post('/providers', providerController.createProvider);
router.put('/providers/id/:id', providerController.modifyProviderById);
router.delete('providers/id/:id', providerController.deleteProviderById);

module.exports = router;