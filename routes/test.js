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

router.post('/uni', (req, res, next) => {
    const uni = new University({
        _id: new mongoose.Types.ObjectId(),
        'name': req.body.name,
    });
    console.log(uni)
    uni.save()
    .then(result => {
        res.status(201).json({
            message: "uni registered successfully.",
        });
    })
    .catch(err => {
        res.status(200).json({
            error: "uni creation error"
        });
    });
});

module.exports = router;
