const express        = require('express');
const logger         = require('morgan');
const path           = require('path');
const session        = require('express-session');
const methodOverride = require('method-override');
const bodyParser     = require('body-parser');
const userRoute      = require('./routes/user');
const homeRoute      = require('./routes/home');
const postRoute      = require('./routes/post');
const errorRoutes    = require('./routes/error');

const app            = express();
const port           = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

// Adding session as a middleware
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'sooopersekret',
  cookie: { maxAge: 86400000 }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(methodOverride('_method'));

// Routes
app.use('/',homeRoute);
app.use('/user',userRoute);
app.use('/post',postRoute);
app.use('*',errorRoutes);

app.listen(port,() => {
  console.log('Server is listening on port ',port);
});
