const express = require("express");
const router = express();
const mongoose = require("mongoose")

const Comment = require("../models/Comment");
const Course = require("../models/Course");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Thread = require("../models/Thread");
const University = require("../models/University");

router.get('/', (req,res,next) =>{
    res.status(200).json({
        message: "Helloo"
    })
});

// router.post('')

router.post('/uni', (req, res, next) => {
    const uni = new University({
        _id: new mongoose.Types.ObjectId(),
        'name': req.body.name,
    });
    uni.save()
    .then(result => {
        res.status(201).json({
            message: "uni registered successfully.",
            "uni": result
        });
    })
    .catch(err => {
        res.status(200).json({
            error: "uni creation error" + err.message
        });
    });
});

router.post('/course', (req, res, next) => {
    const t_id = req.body.t_id;
    Teacher.find({ _id: t_id })
        .then(teacher => {
            console.log(teacher)
            const course = new Course({
                _id: new mongoose.Types.ObjectId(),
                "name": req.body.name,
                "university": teacher[0].university,
                "teacher": t_id,
                "code": req.body.code
            });
            course.save()
            .then(result => {
                res.status(201).json({
                    "message": "Course created",
                    "course": result
                })
            })
            .catch(err => {
                res.status(200).json({
                    error: "Course not created " + err.message
                })
            });
        });
});


router.post('/thread', (req, res, next) => {
    const c_id = req.body.c_id;
    Course.find({ _id: c_id })
        .then(course => {
            const thread = new Thread({
                _id: new mongoose.Types.ObjectId(),
                "title": req.body.title,
                "body": req.body.body,
                "course": c_id
            });
            thread.save()
            .then(result => {
                res.status(201).json({
                    "message": "Thread created",
                    "thread": result
                })
            })
            .catch(err => {
                res.status(200).json({
                    error: "Thread not created " + err.message
                })
            });
        });
});


router.post('/comment', (req, res, next) => {
    const t_id = req.body.t_id;
    Thread.find({ _id: t_id })
        .then(thread => {
            const comment = new Comment({
                _id: new mongoose.Types.ObjectId(),
                "body": req.body.body,
                "thread": t_id,
                "student": req.body.u_id
            });
            comment.save()
            .then(result => {
                res.status(201).json({
                    "message": "Comment created",
                    "comment": result
                })
            })
            .catch(err => {
                res.status(200).json({
                    error: "Comment not created"
                })
            });
        });
});

router.post('/teacher', (req, res, next) => {
    const u_id = req.body.u_id;
    teacher = new Teacher({
        _id: new mongoose.Types.ObjectId(),
        "university": u_id,
        "name": req.body.name
    })
    teacher.save()
    .then(result => {
        res.status(201).json({
            message: "Teacher registered successfully.",
            "teacher": result
        });
    })
    .catch(err => {
        res.status(200).json({
            error: "teacher creation error"
        });
    });
});


router.post('/student', (req, res, next) => {
    const u_id = req.body.u_id;
    student = new Student({
        _id: new mongoose.Types.ObjectId(),
        "university": u_id,
        "subscriptions": [],
        "name": req.body.name,
        "upvotes": []
    })
    student.save()
    .then(result => {
        res.status(201).json({
            message: "student registered successfully.",
            "student": result
        });
    })
    .catch(err => {
        res.status(200).json({
            error: "student creation error" + err.message
        });
    });
});

router.get('/uni/:u_id', (req, res, next) => {
    const u_id = req.params.u_id;
    University.find({_id: u_id})
    .then(result => {
        res.status(201).json({
            "uni": result
        })
    })
});

router.post('/subscribe', (req, res, next) => {
    const s_id = req.body.s_id;
    const c_id = req.body.c_id;
    Student.update(
        { _id: s_id },
        { $push: { "subscriptions": c_id } },
        function(err, model) {
            if(err){
                res.status(400).json({
                    error: err.message
                });
            } else {
                res.status(201).json({
                    "message": model
                })
            }
            
        }
     )
});

router.post('/upvote', (req, res, next) => {
    const s_id = req.body.s_id;
    const c_id = req.body.c_id;
    Student.find({_id: s_id})
    .then(student => {
        if(!student[0].upvotes.includes(c_id)){
            Student.update(
                { _id: s_id },
                { $push: { "upvotes": c_id } },
                function(err, model) {
                    if(err){
                        res.status(400).json({
                            error: err.message
                        });
                    } else {
                        Comment.update(
                            { _id: c_id },
                            { $inc: { "upvotes": 1 } },
                            function(err, model) {
                                if(err){
                                    res.status(400).json({
                                        error: err.message
                                    });
                                } else {
                                    res.status(201).json({
                                        "message": "upvote incremented"
                                    })
                                }
                                
                            }
                         )
                    }
                    
                }
             )
        } else {
            res.status(401).json({
                error: "Already Upvoted"
            })
        }
    })
    
     
});


module.exports = router;
