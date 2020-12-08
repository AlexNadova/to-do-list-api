const sql = require("./db.js");
const async = require("async");

// constructor
const Note = function (note) {
  this.userId = note.userId;
  this.title = note.title;
  this.content = note.content;
  this.tags = note.tags;
};

Note.create = (userId, newNote, result) => {
  sql.query(
    "INSERT INTO notes SET userId = ?, title = ?, content = ?",
    [userId, newNote.title, newNote.content],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      async.each(
        newNote.tags,
        (tag, callback) => {
          sql.query(
            "INSERT INTO notes_n_tags SET noteId = ?, tagId = ?",
            [res.insertId, tag],
            (err, res) => {
              if (err) {
                callback(err);
              } else {
                callback(null);
              }
            }
          );
        },
        function (err) {
          if (err) {
            result(err, null);
            return;
          }
          result(null, { id: res.insertId, ...newNote });
        }
      );
    }
  );
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
        sql.query(
          "SELECT notes_n_tags.tagId, tags.name FROM notes_n_tags INNER JOIN tags ON notes_n_tags.tagId = tags.id WHERE noteId = ?",
          noteId,
          (err, tags) => {
            if (err) {
              result(err, null);
              return;
            }
            res[0].tags = tags;
            result(null, res[0]);
          }
        );
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
        result(err, null);
        return;
      }
      async.each(
        res,
        (row, callback) => {
          sql.query(
            "SELECT notes_n_tags.tagId, tags.name FROM notes_n_tags INNER JOIN tags ON notes_n_tags.tagId = tags.id WHERE noteId = ?",
            row.id,
            (err, tags) => {
              if (err) {
                callback(err);
              } else {
                row.tags = tags;
                callback(null);
              }
            }
          );
        },
        function (err) {
          if (err) {
            result(err, null);
            return;
          }
          result(null, { userId, data: res });
        }
      );
    }
  );
};

Note.updateById = (userId, id, note, result) => {
  sql.query(
    "UPDATE notes SET title = ?, content = ? WHERE userId = ? AND id = ?",
    [note.title, note.content, userId, id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (note.tags) {
        sql.query(
          "DELETE FROM notes_n_tags WHERE noteId = ?",
          id,
          (err, tags) => {
            if (err) {
              result(err, null);
              return;
            }
            if (note.tags.length) {
              async.each(
                note.tags,
                (tag, callback) => {
                  sql.query(
                    "INSERT INTO notes_n_tags SET noteId = ?, tagId = ?",
                    [id, tag],
                    (err, res) => {
                      if (err) {
                        callback(err);
                      } else {
                        callback(null);
                      }
                    }
                  );
                },
                function (err) {
                  if (err) {
                    result(err, null);
                    return;
                  }
                }
              );
            }
          }
        );
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

Note.remove = (userId, id, result) => {
  sql.query(
    "DELETE FROM notes WHERE userId = ? AND id = ?",
    [userId, id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Note with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res);
    }
  );
};

module.exports = Note;
