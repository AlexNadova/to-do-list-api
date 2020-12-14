const { verifyToken, validate, checkEmail } = require("../middleware");
const userController = require("../controllers/UserController.js");

module.exports = (app) => {
  // Retrieve a single User with userId
  app.get("/api/users/:userId", verifyToken, userController.findOne);

  // Update a User with userId
  app.put(
    "/api/users/:userId",
    [
      verifyToken,
      validate({
        email: "required|email",
        name: "required|string|max:30",
        password: "required|string|min:6|confirmed",
      }),
      checkEmail,
    ],
    userController.update
  );

  // Delete a User with userId
  app.delete("/api/users/:userId", verifyToken, userController.delete);
};
