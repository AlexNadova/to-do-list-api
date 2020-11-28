const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/UserModel");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err || req.params.userId != decoded.id) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

checkEmail = (req, res, next) => {
  User.findByEmail(req.body.email, (err, data) => {
    if (data) {
      res.status(400).send({
        message: "Email already in use.",
      });
      return;
    }
    next();
  });
};

module.exports = checkEmail;
module.exports = verifyToken;
