const express = require("express");
const router = new express.Router();
const shopController = require("../Controllers/shopController");
const authController = require("../Controllers/authController");
/////

////
//const upload = require("../middleware/upload");
router.get("/", shopController.homePage);
router.post("/add", shopController.upload, shopController.createShop);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/protected", authController.authCheck, authController.protected);
router.post("/uploadTest", shopController.upload, shopController.homePage);
module.exports = router;
