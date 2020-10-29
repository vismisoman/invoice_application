const jwt = require("jsonwebtoken");
const { getTokenInfo } = require("./token.service");
//const logger = require("../common/logger").log;

/*
 * This is for (requestToken)accessToken and refreshToken generation
 * publicKey:req.body.key
 * privateKey: req.headers
 */
module.exports = {
  //JWT validation
  checkToken: (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.userData = decoded;
      next();
    } catch (error) {
      console.log(" error", error);
      return res.status(400).send({
        status: 400,
        success: false,
        message: "Invalid Access Token, Please refresh!!",
      });
    }
  },

  requestToken: (req, res) => {
    var publicKey = req.body.key;
    const authHeader = req.headers["authorization"];
    const privateKey = authHeader && authHeader.split(" ")[1];

    var token = {
      publicKey: publicKey,
      privateKey: privateKey,
    };

    var accessToken = generateAccessToken(token);
    var refreshToken = generateRefreshToken(token);
    if (accessToken) {
      return res.status(200).json({
        status: 200,
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
    return res.status(410).json({
      status: 410,
      success: false,
      message: "Currently not Available",
    });
  },

  validateAuthToken: (req, res, next) => {
    logger("validateAuthToken", req.body.authToken);
    let authToken = req.body.authToken;
    if (authToken) {
      jwt.verify(authToken, process.env.JWT_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({
            status: 403,
            success: false,
            message: "Authentication Token expired!!",
          });
        }
      });
    }
  },

  /*
   * This is for auth token expiry validation
   * To verify if the application is idle more than 30mins or not
   * authToken:req.body.authToken
   */
  authTokenExpiry: (req, res, next) => {
    let authToken = req.query.authToken;
    getTokenInfo(authToken)
      .then((value) => {
        let localNow =
          (new Date().getTime() - value.created_time.getTime()) / 60000;
        console.log("time ", parseInt(localNow));
        if (parseInt(localNow) >= 30) {
          return res.status(401).json({
            status: 401,
            success: false,
            message: "Please login again as you are idle!!!!!",
          });
        }
        next();
      })
      .catch((err) => {
        console.log("in catch err ", err);
        return res.sendStatus(403);
      });
  },
};

function generateAccessToken(token) {
  let expiration = "10h";
  return jwt.sign(token, process.env.JWT_KEY, {
    expiresIn: expiration,
  });
}
function generateRefreshToken(token) {
  return (refreshToken = jwt.sign(token, process.env.JWT_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  }));
}
