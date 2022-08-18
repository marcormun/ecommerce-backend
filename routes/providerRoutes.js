const router = require('express').Router();
const providerController = require('../controllers/providerController');

router.get('/providers', providerController.getAllProviders);
router.get('/providers/:id', providerController.getProviderById);
router.get('/providers/:id/name', providerController.getProviderByName);
router.post('/providers', providerController.createProvider);


module.exports = router;