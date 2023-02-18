const express = require("express");
const router = express.Router();
const configController = require("../controllers/configrationController");

router.post("/addState", configController.addState);
router.get("/getStates", configController.getStates);

module.exports = router;
