var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

var userModel = module.exports = mongoose.model('users', userSchema)