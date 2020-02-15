var express = require('express');
var router = express.Router();
var teacher = require('../controllers/teacher');

/* GET users listing. */
router.post('/creat_thread', teacher.create_thread);

module.exports = router;
