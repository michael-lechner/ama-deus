
var mongoose = require('mongoose');

var practitionerSchema = new mongoose.Schema({
    name: String,
    country: String,
    email: String,
    region: String
});

var practitionerModel = module.exports = mongoose.model('practitioner', practitionerSchema)

