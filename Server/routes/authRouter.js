const express = require("express");
const router = express.Router();
const { register, login, authVerify, logout } = require("../controllers/auth");
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/authVerify").post(authVerify);
router.route("/logout").get(logout);
module.exports = router;
