const { verifyToken, validate } = require("../middleware");

module.exports = (app) => {
  const noteController = require("../controllers/NoteController.js");

  // Create a new Note
  app.post(
    "/api/notes/:userId",
    [
      verifyToken,
      validate({
        title: "string|max:255",
        content: "required|string",
      }),
    ],
    noteController.create
  );

  // Retrieve all Notes
  app.get("/api/notes/:userId", [verifyToken], noteController.findAll);

  // Retrieve a single Note with noteId
  app.get("/api/notes/:userId/:noteId", [verifyToken], noteController.findOne);

  // Update a Note with noteId
  app.put(
    "/api/notes/:userId/:noteId",
    [
      verifyToken,
      validate({
        title: "required|string|max:255",
        content: "required|string",
      }),
    ],
    noteController.update
  );

  // Delete a Note with noteId
  app.delete(
    "/api/notes/:userId/:noteId",
    [verifyToken],
    noteController.delete
  );
};
