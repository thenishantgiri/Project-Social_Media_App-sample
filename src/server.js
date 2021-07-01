const express = require("express");

// requiring database from database models
const { db } = require("./db/models");

// requiring routes from routes
const { usersRoute } = require("./routes/users");
const { postsRoute } = require("./routes/posts");
const { commentsRoute } = require("./routes/posts/comments");

const app = express();

// for handling post Requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mounting api (s)
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);

app.use("/", express.static(__dirname + "/public"));

// we're first making connection with database, then starting the server (promise syntax)
db.sync()
  .then(() => {
    app.listen(8383, () => {
      console.log("server has started on http://localhost:8383");
    });
  })
  .catch((err) => {
    console.error(new Error("could not start database"));
    console.error(err);
  });
