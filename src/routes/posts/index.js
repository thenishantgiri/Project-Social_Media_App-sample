const { Router } = require("express");
const {
  findAllPosts,
  createNewPost,
  getPostsByUsername,
} = require("../../controllers/posts");

const route = Router();

route.get("/", async (req, res) => {
  const post = await findAllPosts();

  res.status(200).send(post);
});

route.get("/getPostsByUsername", async (req, res) => {

  const posts = await getPostsByUsername(currentUser.username);

  res.status(200).send(posts);
});

route.post("/", async (req, res) => {
  const { userId, title, body } = req.body;

  if (!userId || !title || !body) {
    return res
      .status(400)
      .send({ error: "need userId, title, body to create a post." });
  }

  const post = await createNewPost(userId, title, body);

  res.status(200).send(post);
});

module.exports = {
  postsRoute: route,
};
