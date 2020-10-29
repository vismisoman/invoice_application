const router = require("express").Router();
const { login } = require("./auth.controller");
const { checkToken } = require("../token/token.controller"); // Request Token validation

router.post("/login", checkToken, login);

module.exports = router;
