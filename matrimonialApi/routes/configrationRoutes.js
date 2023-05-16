const express = require('express');
const router = express.Router();
const configController = require('../controllers/configrationController');
const isAuthenticated = require('../middleware/auth');

router.post('/addState', isAuthenticated, configController.addState);
router.put(
  '/updateState/:stateId',
  isAuthenticated,
  configController.updateState
);
router.get('/getStates', isAuthenticated, configController.getStates);
router.get('/getStatus', isAuthenticated, configController.getStatus);

module.exports = router;
