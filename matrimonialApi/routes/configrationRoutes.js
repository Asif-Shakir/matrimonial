const express = require('express');
const router = express.Router();
const configController = require('../controllers/configrationController');
const isAuthenticated = require('../middleware/auth');

router.post('/addState', isAuthenticated, configController.addState);
router.put('/updateState/:stateId',isAuthenticated,configController.updateState);
router.get('/getStates', isAuthenticated, configController.getStates);
router.get('/getStatus', isAuthenticated, configController.getStatus);
router.post('/addCity', isAuthenticated, configController.addCity);
router.put('/updateCity/:cityId', isAuthenticated, configController.updateCity);
router.get('/getCityList', isAuthenticated, configController.getCityList);

module.exports = router;
