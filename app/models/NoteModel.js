const sql = require("./db.js");
const async = require("async");

// constructor
const Note = function (note) {
  this.userId = note.userId;
  this.title = note.title;
  this.content = note.content;
};

Note.create = (newNote, result) => {
  sql.query("INSERT INTO notes SET ?", newNote, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newNote });
  });
};

Note.findById = (userId, noteId, result) => {
  sql.query(
    "SELECT * FROM notes WHERE userId = ? AND id = ?",
    [userId, noteId],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      // not found Note with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Note.getAll = (userId, result) => {
  sql.query(
    "SELECT notes.id, notes.title, notes.content, notes.createdAt, notes.updatedAt FROM notes where userID = ?",
    userId,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      async.each(
        res,
        (row, callback) => {
          sql.query(
            "SELECT notes_n_tags.tagId, tags.name FROM notes_n_tags INNER JOIN tags ON notes_n_tags.tagId = tags.id WHERE noteId = ?",
            row.id,
            (err, tags) => {
              row.tags = tags;
              callback(null);
            }
          );
        },
        function (err) {
          if (err) {
            result(null, err);
            return;
          }
          result(null, { userId, data: res });
        }
      );
    }
  );
};

Note.updateById = (id, note, result) => {
  sql.query(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?",
    [note.title, note.content, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Note with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...note });
    }
  );
};

Note.remove = (id, result) => {
  sql.query("DELETE FROM notes WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Note with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Note;
