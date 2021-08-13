const { Posts, Users } = require("../db/models");

async function createNewPost(userId, title, body) {
  const post = await Posts.create({
    title,
    body,
    userId,
  });

  return post;
}

/**
 * findAllPosts({username: ''})
 * findAllPosts({title: ''})
 */

async function findAllPosts(query) {
  // TODO: handle query params
  const posts = await Posts.findAll({
    include: [Users],
  });

  return posts;
}

async function getUserId(username) {
  const userId = await Users.findOne({
    where: { username: username },
  });

  return userId.id;
}

async function getPostsByUsername(username) {
  return await Posts.findAll({
    where: { userId: await getUserId(username) },
    include: [Users],
  });
}

module.exports = {
  createNewPost,
  findAllPosts,
  getPostsByUsername
};

/* Test Code 

async function task() {
  //   console.log(
  //     await createNewPost(
  //       1,
  //       "This is a sample post",
  //       "Body of the post goes here"
  //     )
  //   );
  //   console.log(
  //     await createNewPost(2, "This is another post", "Some body example as well")
  //   );

  const post = await showAllPosts();
  for (let p of post) {
    console.log(
      `${p.title}\nauthor: ${p.user.username}\n${p.body}\n================\n`
    );
  }
}

task(); 
*/
