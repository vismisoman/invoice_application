const router = require("express").Router();
const { checkToken } = require("../token/token.controller"); // Request Token validation
const {
  insertUser,
  invoice,
  signupUser,
  activate,
} = require("./user.controller");
const { signupValidation } = require("../validators/user-validator");

router.get("/invoice", invoice);
router.post("/insertUser", insertUser);

router.post("/signup", checkToken, signupValidation, signupUser);
router.post("/activate", checkToken, activate);

module.exports = router;
