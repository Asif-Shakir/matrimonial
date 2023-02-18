const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const isAuthenticated = require("../../middleware/auth");

router.post("/signup", isAuthenticated, authController.postSignup);
router.post("/login", authController.postLogin);
router.get("/getUserRoles", isAuthenticated, authController.getRoles);
module.exports = router;
