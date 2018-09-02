var mongoose = require('mongoose');


var StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    dob: String,
    landlineNo: String,
    MobileNo: Number,
    parentsOccupation: String,
    address: String,
    standard: String,
    board: String,
    school: String,
    score: Number,
    noOfDays: Number,
    days: Array,
    type: String,
    time: String,
    subjects: Array,
    source: String

}, { timestamps: true });

module.exports = mongoose.model('student', StudentSchema);