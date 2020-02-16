var express = require('express');
var router = express.Router();
var passport = require('passport')
var courses = [{ 'name': 'ITC', 'course_code': 'CS 302' }, { 'name': 'CP', 'course_code': 'CS 502' }, { 'name': 'Algo', 'course_code': 'CS 202' }]
var course = { 'name': 'ITC', 'course_code': 'CS 302', 'threads': [{ 'title': 'Functions' }, { 'title': 'Arrays' }, { 'title': 'Pass By Value' }] }
var thread = { 'title': 'Functions', 'body': 'Functions are used to perform certain actions, and they are important for reusing code: Define the code once, and use it many times.', 'comments': [{ 'student': 'Zulqar', 'body': 'nice sax ass', 'upvotes': '10000' }, { 'student': 'ahmed booty', 'body': 'nice ass', 'upvotes': '8000' }, { 'student': 'ahmed booty', 'body': 'nice ass', 'upvotes': '8000' }, { 'student': 'ahmed booty', 'body': 'nice ass', 'upvotes': '8000' }, { 'student': 'ahmed booty', 'body': 'nice ass', 'upvotes': '8000' }] }


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

router.get('/courses', function (req, res, next) {
  res.render('courses', { 'courses': courses });
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
