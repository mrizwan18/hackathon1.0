var express = require('express');
var router = express.Router();
var passport = require('passport')
var Course = require('../models/Course');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/add_course', function (req, res, next) {
  res.render('add_course');
});

router.get('/create_thread', function (req, res, next) {
  res.render('create_thread');
});

router.get('/courses/:id', function (req, res, next) {
  Course.find({ university: req.params.id }).exec(function (err, courses) {
    if (err) throw err;
    res.render('courses', { 'courses': courses });

  });

});

router.get('/thread', function (req, res, next) {
  res.render('thread', { 'thread': thread });
});

router.get('/course_detail', function (req, res, next) {
  res.render('course_detail', { 'course': course });
});


router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

module.exports = router;
