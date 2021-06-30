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
 * showAllPosts({username: ''})
 * showAllPosts({title: ''})
 */

async function showAllPosts(query) {
  // TODO: handle query params
  const posts = await Posts.findAll({
    include: [Users],
  });

  return posts;
}

module.exports = {
  createNewPost,
  showAllPosts,
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
