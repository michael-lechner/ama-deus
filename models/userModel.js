var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true}
});

var userModel = module.exports = mongoose.model('users', userSchema)