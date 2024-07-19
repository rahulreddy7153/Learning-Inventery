const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Define routes
router.post("/signup", UserController.signupUser);
router.post("/login", UserController.loginUser);

module.exports = router;
