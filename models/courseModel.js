var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    firstLevel: Boolean,
    secondLevel: Boolean,
    startDate: String,
    endDate: String
});

var courseModel = module.exports = mongoose.model('course', courseSchema);