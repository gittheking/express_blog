const router          = require('express').Router();
const { getAllPosts } = require('../models/post');

router.get('/', getAllPosts, (req,res) => {
  let currentUser = req.session.user;
  console.log('currentUser: ',currentUser);
  res.render('index',{ title: 'Express Blog',
                       currentUser: currentUser,
                       posts: res.rows });
});

module.exports = router;