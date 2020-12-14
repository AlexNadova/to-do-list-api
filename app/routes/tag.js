module.exports = (app) => {
  const tagController = require("../controllers/TagController.js");
  app.get("/api/tags", tagController.findAll);
};
