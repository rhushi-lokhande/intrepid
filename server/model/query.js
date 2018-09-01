var mongoose = require('mongoose');


var QuerySchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
}, { timestamps: true });

module.exports = mongoose.model('query', QuerySchema);