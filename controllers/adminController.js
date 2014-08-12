var mongoose = require('mongoose');
var practitionerModel = require('../models/practitionerModel.js');
var courseModel = require('../models/courseModel.js');

var admin = module.exports = {
    test: function (req, res){
        console.log('req', req.body);
        var practitioner = new practitionerModel({
            name: req.body.name,
            country: req.body.country,
            email: req.body.email,
            region: req.body.region
        });

        practitioner.save();

        practitionerModel.find({}, function(err, docs){
            if(err) console.log('error in adminController.test', err);
            res.send(docs);
        });
        // courseModel.find({}, function(err, docs){
        //     if(err) console.log('erro in amdinController.test', err);
        //     res.send(docs);
        // });
    },
    index: function(req, res){
        res.render('admin.jade')
    }
}