const router              = require('express').Router();
const { getAllUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        loginUser,
        logoutUser }      = require('../models/user');
const { getPostsForUser } = require('../models/post');

router.get('/new', (req,res) => {
  let currentUser = req.session.user;
  res.render('user/new', {title: 'Sign Up', currentUser: currentUser });
});

router.post('/new', createUser, (req,res) => {
  res.redirect('/');
});

// Get route to the login page
router.get('/login', (req,res) => {
  let error;
  let currentUser = req.session.user;
  if('query' in req) {
    error = req.query.error;
  }
  res.render('user/login',{ error: error, title: 'Login', currentUser: currentUser });
});

// Post route for user to login
router.post('/login', loginUser, (req,res) => {
  if( res.error ) {
    // Passing data in the redirect with query string
    let errorStr = encodeURIComponent(res.error);
    res.redirect('/user/login?error=' + errorStr);
  } else {
    req.session.user = res.rows;
    res.redirect('/');
  }
});

router.get('/logout',logoutUser,(req,res) => {
  res.redirect('/');
});

router.get('/profile',(req,res) => {
  let currentUser = req.session.user;
  res.render('user/profile', {title: 'Profile', currentUser });
})

router.get('/show/:id',getUser,getPostsForUser,(req,res) => {
  let currentUser = req.session.user;
  res.render('user/show', { title: 'User Info',
                            currentUser: currentUser,
                            user: res.userInfo,
                            posts: res.posts });
});

module.exports = router;