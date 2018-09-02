const Student = require('../model/student');

let StudentController = {
    Register: function (req, res) {
        console.log(req.body);
        var student = new Student();
        
        student.name= req.body.name;
        student.email= req.body.email;
        student.gender= req.body.gender;
        student.dob= req.body.DOB;
        student.landlineNo= req.body.landlineNo;
        student.MobileNo= req.body.MobileNo;
        student.parentsOccupation= req.body.parentsOccupation;
        student.address= req.body.address;
        student.standard= req.body.standard;
        student.board= req.body.board;
        student.school= req.body.school;
        student.score= req.body.score;
        student.noOfDays= req.body.noOfDays;
        student.days= req.body.days;
        student.type= req.body.type;
        student.time= req.body.time;
        student.subjects= req.body.subject.split(',');
        student.source= req.body.source;
        student.save((err, student) => {
            if (err) {
                console.log(student);
                throw err;
            }
            return res.send(student);
        });
    },
    getStudents:function(req,res){
        Student.find((err,data)=>{
            if (err) {
                console.log(err);
                throw err;
            }
            return res.send(data);
        })
    }
}

module.exports = StudentController;;