const sql = require("./db.js");

const Tag = function (tag) {
  this.name = tag.name;
};

Tag.getAll = (result) => {
  sql.query("SELECT * FROM tags", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Tag;
