const express = require('express');
var University = require('../models/University');
var Course = require('../models/Course');
var Thread = require('../models/Thread');
var Comment = require('../models/Comment');

exports.all_universities = (req, res) => {
  // authenticate user
  // authorize user
  University.find({}, function (err, universities){
    if(err) throw err;
    res.send(universities);
  });
};

exports.university_detail = (req, res) => {
  University.findOne({_id: req.params.uni_id}, function (err, university){
    if(err) throw err;
    res.send(university);
  });
};

exports.all_courses = (req, res) => {
  Course.find({university: req.params.uni_id}, function (err, courses){
    if(err) throw err;
    res.send(courses);
  });
};

exports.course_detail = (req, res) => {
  Course.findOne({_id: req.params.course_id}, function (err, course){
    if(err) throw err;
    res.send(course);
  });
};

exports.all_threads = (req, res) => {
  Thread.find({course: req.params.course_id}, function(err, threads){
    if(err) throw err;
    res.send(threads);
  });
};

exports.thread_detail = (req, res) => {
  Thread.findOne({_id: req.params.thread_id}, function(err, thread){
    if(err) throw err;
    res.send(thread);
  });
};

exports.all_comments = (req, res) => {
  Comment.find({thread: req.params.thread_id}, function(err, comments){
    if(err) throw err;
    res.send(comments);
  }).sort({upvotes: -1});
};

