const express = require("express");

const router = express.Router();
const loinController = require("../../controllers/loginController");

router.route("/").post(loinController.handleLogin);

module.exports = router;
