const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3001",
  // methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//for parsing multipart/form-data
app.use(upload.array());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

require("./app/routes/user.js")(app);
require("./app/routes/note.js")(app);
require("./app/routes/tag.js")(app);
require("./app/routes/auth.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000.");
});
