const sql = require("./db.js");

// constructor
const Note = function (note) {
  (this.userId = note.userId), (this.content = note.content);
};

Note.create = (newNote, result) => {
  sql.query("INSERT INTO notes SET ?", newNote, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created note: ", { id: res.insertId, ...newNote });
    result(null, { id: res.insertId, ...newNote });
  });
};

Note.findById = (userId, noteId, result) => {
  sql.query(
    "SELECT * FROM notes WHERE userId = ? AND id = ?",
    [userId, noteId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found note: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Note with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Note.getAll = (userId, result) => {
  sql.query("SELECT * FROM notes where userID = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Note.updateById = (id, content, result) => {
  sql.query(
    "UPDATE notes SET content = ? WHERE id = ?",
    [content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Note with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated note: ", { id: id, content: content });
      result(null, { id: id, content: content });
    }
  );
};

Note.remove = (id, result) => {
  sql.query("DELETE FROM notes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Note with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted note with id: ", id);
    result(null, res);
  });
};

module.exports = Note;
