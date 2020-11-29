const { verifyToken } = require("../middleware");

module.exports = (app) => {
  const noteController = require("../controllers/NoteController.js");

  // Create a new Note
  app.post("/api/notes/:userId", [verifyToken], noteController.create);

  // Retrieve all Notes
  app.get("/api/notes/:userId", [verifyToken], noteController.findAll);

  // Retrieve a single Note with noteId
  app.get("/api/notes/:userId/:noteId", [verifyToken], noteController.findOne);

  // Update a Note with noteId
  app.put("/api/notes/:userId/:noteId", [verifyToken], noteController.update);

  // Delete a Note with noteId
  app.delete(
    "/api/notes/:userId/:noteId",
    [verifyToken],
    noteController.delete
  );
};
