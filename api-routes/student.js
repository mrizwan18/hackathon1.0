var express = require('express');
var router = express.Router();
var student = require('../controllers/student');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all_subscriptions/:student_id', student.all_subscriptions);

module.exports = router;
