var express = require('express');
var router = express.Router();
var user = require('../controllers/user');

/* GET home page. */
router.get('/all_universities', user.all_universities);
router.get('/university_detail/:uni_id', user.university_detail);
router.get('/all_courses/:uni_id', user.all_courses);
router.get('/course_detail/:course_id', user.course_detail);
router.get('/all_threads/:course_id', user.all_threads);
router.get('/thread_detail/:thread_id', user.thread_detail);
router.get('/all_comments/:thread_id', user.all_comments);

module.exports = router;
