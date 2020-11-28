const verifyToken = require("../middleware/authentication");
const userController = require("../controllers/UserController.js");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve a single User with userId
  app.get("/users/:userId", [verifyToken], userController.findOne);

  // Update a User with userId
  app.put("/users/:userId", [verifyToken], userController.update);

  // Delete a User with userId
  app.delete("/users/:userId", [verifyToken], userController.delete);
};
