const Note = require("../models/NoteModel.js");

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Note
  const note = new Note({
    userId: req.body.userId,
    content: req.body.content,
  });

  // Save Note in the database
  Note.create(note, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    else res.send(data);
  });
};

// Retrieve all Notes from the database.
exports.findAll = (req, res) => {
  Note.getAll(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    else res.send(data);
  });
};

// Find a single Note with a noteId
exports.findOne = (req, res) => {
  Note.findById(req.userId, req.params.noteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Note with id ${req.params.noteId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Note with id " + req.params.noteId,
        });
      }
    } else res.send(data);
  });
};

// Update a Note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Note.updateById(req.params.noteId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Note with id ${req.params.noteId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Note with id " + req.params.noteId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.remove(req.params.noteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Note with id ${req.params.noteId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Note with id " + req.params.noteId,
        });
      }
    } else res.send({ message: `Note was deleted successfully!` });
  });
};
