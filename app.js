var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./api-routes/index');
var studentRouter = require('./api-routes/student');
var teacherRouter = require('./api-routes/teacher');
var testRoutes = require('./routes/test');
var common = require('./routes/common');

var config = require('./database/DB');
var mongoose = require('mongoose');
const passport = require('passport');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const User = require('./models/Student.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'));

app.use('/api', indexRouter);
app.use('/student/api', studentRouter);
app.use('/teacher/api', teacherRouter);
app.use('/test', testRoutes);
app.use('/', common);

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
  clientID: "198133394722504",
  clientSecret: "7824c73fdde5654e71ada10658f314d3",
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['name'],  /* 'email', 'link', 'locale', 'timezone', 'gender'*/
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    User.findOne({ name: profile._json.name }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          // user.facebook = profile.id;
          // user.tokens.push({ kind: 'facebook', accessToken });
          user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
          // user.profile.gender = user.profile.gender || profile._json.gender;
          // user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.save((err) => {
            req.flash('info', { msg: 'Facebook account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    console.log(profile)
    User.findOne({ name: profile._json.name }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          // req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
          console.log("In Flash")
          done(err);
        } else {
          const user = new User();
          user.name = profile._json.name;
          user.university = "5e47da68d21f0a0d380bce9e";
          // user.facebook = profile.id;
          // user.tokens.push({ kind: 'facebook', accessToken });
          // user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
          // user.profile.gender = profile._json.gender;
          // user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          // user.profile.location = (profile._json.location) ? profile._json.location.name : '';
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
}));

module.exports = app;
