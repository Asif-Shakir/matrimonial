const express = require('express');
const router = express.Router();
const configController = require('../controllers/configrationController');
const isAuthenticated = require('../middleware/auth');

router.post('/addState', isAuthenticated, configController.addState);
router.get('/getStates', isAuthenticated, configController.getStates);

module.exports = router;
