const { Router } = require("express");
const {
  createNewComment,
  getAllCommentsByPostId,
  getCommentsByUserId,
  getCommentsByUsername,
} = require("../../controllers/comments");

const route = Router();

// if no params has been passed along with query : fetching all comments
route.get("/", async (req, res) => {

  let postId = req.query.postId;
  const comments = await getAllCommentsByPostId(postId);

  res.status(200).send(comments);
});

route.get("/:id", async (req, res) => {
  let comments;

  if (isNaN(parseInt(req.params.id))) {
    // when param is username
    comments = await getCommentsByUsername(req.params.id);
  } else {
    comments = await getCommentsByUserId(req.params.id);
  }

  if (comments) {
    res.status(200).send(comments);
  } else {
    res.status(404).send({
      error: "No comments found under this user id or user name",
    });
  }
});

route.post("/", async (req, res) => {
  const { userId, postId, title, body } = req.body;

  if (!userId || !postId || !title || !body) {
    return res
      .status(400)
      .send({ error: "need userId,postId, title, body to create a comment." });
  }

  const comment = await createNewComment(title, body, userId, postId);

  res.status(200).send(comment);
});

module.exports = {
  commentsRoute: route,
};
