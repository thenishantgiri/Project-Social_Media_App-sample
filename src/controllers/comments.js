const { Users, Posts, Comments } = require("../db/models");

async function createNewComment(title, body, userId, postId) {
  const comment = await Comments.create({
    title: title,
    body: body,
    userId: userId,
    postId: postId,
  });

  return comment;
}

async function getAllComments() {
  return await Comments.findAll({
    include: [Users, Posts],
  });
}

async function getUserId(username) {
  const userId = await Users.findOne({
    where: { username: username },
  });

  return userId.id;
}

async function getCommentsByUsername(username) {
  return await Comments.findAll({
    where: { userId: await getUserId(username) },
    include: [Users, Posts],
  });
}

async function getCommentsByUserId(userId) {
  return await Comments.findAll({
    where: { userId },
    include: [Users, Posts],
  });
}

async function getAllCommentsByPostId(postId) {
  return await Comments.findAll({
    where: { postId },
    include: [Users, Posts],
  });
}

module.exports = {
  createNewComment,
  getAllCommentsByPostId,
  getCommentsByUserId,
  getCommentsByUsername,
};

//  Test Code

// async function task() {
//   /* // creating new comments
//   console.log(
//     await createNewComment(
//       "This is a sample comment",
//       "Body of the comment goes here",
//       4,
//       2
//     )
//   );
//   console.log(
//     await createNewComment(
//       "This is another comment",
//       "Some body example as well",
//       2,
//       1
//     )
//   );
//   console.log(
//     await createNewComment(
//       "This is another comment of 2nd user",
//       "Some body example as well of 2nd user",
//       2,
//       1
//     )
//   );

//   // getting all the comments
//   const comment = await getAllComments();
//   for (let c of comment) {
//     console.log(
//       `${c.title}\npost username: ${c.user.username}\npost title: ${c.post.title}\n${c.body}\n================\n`
//     );
//   } */
//   /*
//   // getting all the comments by post
//   const comment = await getAllCommentsByPost(2);
//   for (let c of comment) {
//     console.log(
//       `${c.title}\npost username: ${c.user.username}\npost title: ${c.post.title}\n${c.body}\n================\n`
//     );
//   }
//   */
//   /*
//   // getting all the comments by username
//   const comment = await getCommentsByUsername("slim-window");
//   for (let c of comment) {
//     console.log(
//       `${c.title}\nusername: ${c.user.username}\npost title: ${c.post.title}\n${c.body}\n================\n`
//     );
//   }
//   */

//    /*
//     // getting all the comments by userId
//   const comment = await getCommentsByUserId(2);
//   for (let c of comment) {
//     console.log(
//       `${c.title}\nusername: ${c.user.username}\npost title: ${c.post.title}\n${c.body}\n================\n`
//     );
//   }
//   */
// }

// task();
