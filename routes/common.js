var express = require('express');
var router = express.Router();
var passport = require('passport')
var courses = [{ 'name': 'ITC', 'course_code': 'CS 302' }, { 'name': 'CP', 'course_code': 'CS 502' }, { 'name': 'Algo', 'course_code': 'CS 202' }]
var course = { 'name': 'ITC', 'course_code': 'CS 302', 'threads': [{ 'title': 'Functions' }, { 'title': 'Arrays' }, { 'title': 'Pass By Value' }] }
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/courses', function (req, res, next) {
  res.render('courses', { 'courses': courses });
});
router.get('/course_detail', function (req, res, next) {
  res.render('course_detail', { 'course': course });
});


router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

module.exports = router;
