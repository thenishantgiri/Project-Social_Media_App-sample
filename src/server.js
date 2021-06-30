const express = require("express");

// requiring database from database models
const { db } = require("./db/models");

const app = express();

// we're first making connection with database, then starting the server (promise syntax)
db.sync({ force: true })
  .then(() => {
    app.listen(8383, () => {
      console.log("server has started on http://localhost:8383");
    });
  })
  .catch((err) => {
    console.error(new Error("could not start database"));
    console.error(err);
  });
