const { Router } = require("express");

const route = Router();

route.get("/", (req, res) => {
  res.send("//TODO: all comments");
});

module.exports = {
  commentsRoute: route,
};
