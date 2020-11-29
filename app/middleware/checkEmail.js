const User = require("../models/UserModel");

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
