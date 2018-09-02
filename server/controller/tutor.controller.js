const Tutor = require('../model/tutor');

let TutorController = {
    Register: function (req, res) {
        console.log(req.body);
        var tutor = new Tutor();

        tutor.name = req.body.name;
        tutor.email = req.body.email;
        tutor.gender = req.body.gender;
        tutor.dob = req.body.DOB;
        tutor.MobileNo = req.body.MobileNo;
        tutor.qualifications = req.body.qualifications;
        tutor.address = req.body.address;

        tutor.identityProof = req.body.identityProof;
        tutor.resume = req.body.resume;
        tutor.days = req.body.days;
        tutor.type = req.body.type;
        tutor.time = req.body.time;
        tutor.subjects = req.body.subject.split(',');
        tutor.source = req.body.source;
        tutor.save((err, tutor) => {
            if (err) {
                console.log(tutor);
                throw err;
            }
            return res.send(tutor);
        });
    },
    getTutors: function (req, res) {
        Tutor.find((err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.send(data);
        })
    }
}

module.exports = TutorController;;