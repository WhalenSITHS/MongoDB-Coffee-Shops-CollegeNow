const express = require("express");
const router = new express.Router();
const shopController = require("../Controllers/shopController");
const authController = require("../Controllers/authController");
router.get("/", shopController.homePage);
router.post("/add", shopController.createShop);
router.post("/register", authController.register);
router.post("/login", authController.login);
module.exports = router;
