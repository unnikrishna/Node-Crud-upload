const express = require("express");

const router = express.Router();
const logutController = require("../../controllers/logoutController");

router.route("/").get(logutController.handleLogout);

module.exports = router;
