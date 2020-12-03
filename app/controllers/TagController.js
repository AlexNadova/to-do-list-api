const Tag = require("../models/TagModel.js");

// Retrieve all Notes from the database.
exports.findAll = (req, res) => {
  Tag.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tags.",
      });
    else res.send(data);
  });
};

// Find a single Note with a noteId
exports.findAllByNoteId = (req, res) => {
  Tag.getAllByNoteId(req.userId, req.params.noteId, (err, data) => {
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