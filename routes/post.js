const router                   = require('express').Router();
const { createPost,
        getPost }              = require('../models/post');
const { findUserIDByUsername } = require('../models/user');

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

router.get('/:id', getPost, (req,res) => {
  let currentUser = req.session.user;
  res.render('post/show',{ title: res.rows.title,
                           currentUser: currentUser,
                           post: res.rows });
});

module.exports = router;