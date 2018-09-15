var mongoose = require('mongoose');


var TutorSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    dob: String,
    MobileNo: Number,
    qualifications: String,
    address: String,
    subjects: Array,
    type: String,
    time: String,
    days: Array,
    identityProof: String,
    resume: String,
    source:String,
}, { timestamps: true });

module.exports = mongoose.model('tutor3', TutorSchema);