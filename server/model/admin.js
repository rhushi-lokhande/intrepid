var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');

var AdminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: [true, "can't be blank"],  index: true },
    hash: String,
    salt: String,
    
}, { timestamps: true });

AdminSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

AdminSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

AdminSchema.plugin(uniqueValidator, { message: 'is already taken.' });

module.exports = mongoose.model('Admin', AdminSchema);