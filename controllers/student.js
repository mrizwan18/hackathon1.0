const Student = require('../models/Student');


exports.add_comment = (req, res) => {

};

exports.like_comment = (req, res) => {

};

exports.dislike_comment = (req, res) => {

};

exports.all_subscriptions = (req, res) => {
    Student.findOne({_id: req.params.student_id}, function (err, student_info){
        if(err) throw err;
        if(student_info == null || student_info.subscriptions == null || student_info.subscriptions.length <= 0)
        {
            res.send("No Subscriptions");
        }
        else
        {
            res.send(student_info.subscriptions);
        }
    });
};

exports.add_subscription = (req, res) => {

};

exports.remove_subscription = (req, res) => {

};