const { checkEmail, validate } = require("../middleware");
const authController = require("../controllers/AuthController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      checkEmail,
      validate({
        email: "required|email|max:60",
        name: "required|string|max:30",
        password: "required|string|min:6|confirmed",
      }),
    ],
    authController.signup
  );

  app.post(
    "/api/auth/signin",
    validate({
      email: "required|email",
      password: "required|string",
    }),
    authController.signin
  );
};
