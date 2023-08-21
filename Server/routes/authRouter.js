const express = require("express");
const router = express.Router();
const { register, login, authVerify } = require("../controllers/auth");
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/authVerify").get(authVerify);
module.exports = router;
