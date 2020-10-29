const {
  generateIdToken,
  saveIdToken,
  findByUsername,
  findByEmail,
  updateUserLogin,
} = require("../auth/auth.service");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const hash = crypto.createHash("sha256");

module.exports = {
  /*
   * Method for login
   * req.body :username, password
   */
  login: async (req, res) => {
    //logger("login user", req.body);
    const { username, password } = req.body;
    // find user by username
    const user = await findByUsername(username);
    console.log("user with username:", user);
    if (user == null || user.length == 0) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Credentials not matching!",
      });
    }
    if (!user.active) {
      console.log("user.active", user.active);
      return res.status(401).json({
        status: 401,
        success: false,
        message: "User is not activated",
      });
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    console.log("hash***", hash);
    //compare pasword
    if (hash === user.password) {
      const idToken = generateIdToken(user.email, user.username);
      saveIdToken(idToken, user.id);
      updateUserLogin(user);
      console.log("login success");
      return res.status(200).json({
        status: 200,
        idToken: idToken,
        success: true,
        message: "Login successful!",
      });
    }
    return res
      .status(401)
      .json({ status: 401, success: false, message: "Invalid Request Token" });
  },
};
