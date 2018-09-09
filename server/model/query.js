var mongoose = require('mongoose');


var QuerySchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    mobile: String,
}, { timestamps: true });

module.exports = mongoose.model('query1', QuerySchema);