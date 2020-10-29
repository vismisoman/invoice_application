const express = require("express");
var router = express.Router();
const {
  requestToken,
  checkToken,
  authTokenExpiry,
} = require("./token.controller");

router.post("/token", requestToken);
router.post("/expiry", checkToken, authTokenExpiry);
module.exports = router;
