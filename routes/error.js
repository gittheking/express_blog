const router    = require('express').Router();

router.get('/', (req,res) => {
  let currentUser = req.session.user;
  res.render('error',{title: '404 - Not Found', currentUser: currentUser });
});

module.exports = router 