const Student = require('../models/Student');
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