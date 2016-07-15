const db = require('../db/db');

function getAllPosts(req,res,next) {
  db.any(`SELECT posts.post_id, posts.title, posts.created_at, users.username, users.user_id
          FROM posts
          INNER JOIN users
          ON posts.user_id=users.user_id`)
    .then( data => {
      res.rows = data;
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function getPost(req,res,next) {
  db.one(`SELECT posts.post_id, posts.title, posts.description, posts.created_at, users.username, users.user_id
          FROM posts
          INNER JOIN users
          ON posts.user_id=users.user_id
          WHERE posts.post_id=$1`,
          [req.params.id])
    .then( data => {
      res.rows = data;
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function getPostsForUser(req,res,next) {
  db.many(`SELECT posts.post_id, posts.title, posts.created_at, posts.score
           FROM posts
           WHERE user_id = $1
           ORDER BY score ASC`,
           [+req.params.id])
    .then( data => {
      res.posts = data
      next();
    })
    .catch( error => {
      console.log('Error ',error);
      next();
    });
}

function createPost(req,res,next) {
  db.none(`INSERT INTO posts
           (title, description, user_id)
           VALUES
           ($1,$2,$3)`,
           [req.body.title,
            req.body.description,
            res.userID])
    .then( data => {
      console.log('Post was successfully created');
      next()
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function increasePostScore(req,res,next) {
  db.none(`INSERT INTO post_likes
           (post_id,user_id) VALUES
           ($1,$2)`,
           [req.params.id,res.userID])
    .then( data => {
      console.log('Increased Post\'s score!');
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function decreasePostScore(req,res,next) {
  db.none(`UPDATE posts
           SET score = score - 1
           WHERE post_id = $1`,
           [req.params.id])
    .then( data => {
      console.log('Increased Post\'s score!');
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function getLikesForPost(req,res,next) {
  db.many(`SELECT username
          FROM users
          NATURAL JOIN post_likes 
          WHERE post_id = $1`,
          [req.params.id])
    .then( data => {
      console.log('Data',data);
      res.likers = data;
      next();
    })
    .catch( error => {
      console.log('Error', error);
      res.likers = [];
      next();
    });
}

module.exports = { getAllPosts,
                   createPost,
                   getPost,
                   getPostsForUser,
                   increasePostScore,
                   decreasePostScore,
                   getLikesForPost };
