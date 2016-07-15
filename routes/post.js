const router                   = require('express').Router();
const { findUserIDByUsername } = require('../models/user');
const { createPost,
        getPost,
        increasePostScore,
        decreasePostScore,
        getLikesForPost }    = require('../models/post');

router.get('/new', (req,res) => {
  let currentUser = req.session.user;
  if(currentUser) {
    res.render('post/new', { title: 'New Post', currentUser: currentUser });
  } else {
    res.redirect('/');
  }
});

router.post('/new',findUserIDByUsername,createPost,(req,res) => {
  res.redirect('/');
});


router.put('/upvote/:id',findUserIDByUsername,increasePostScore,(req,res) => {
  res.redirect(`/post/${req.params.id}`)
});

router.put('/downvote/:id',decreasePostScore,(req,res) => {
  res.redirect(`/post/${req.params.id}`)
});

router.get('/:id',getPost,getLikesForPost,(req,res) => {
  let currentUser = req.session.user;
  // console.log(res.likers);
  res.render('post/show',{ title: res.rows.title,
                           currentUser: currentUser,
                           post: res.rows,
                           likers: res.likers });
});

module.exports = router;