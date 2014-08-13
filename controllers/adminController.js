var mongoose = require('mongoose');
var practitionerModel = require('../models/practitionerModel.js');
var courseModel = require('../models/courseModel.js');

var admin = module.exports = {
    createPractitioner: function (req, res){
        var practitioner = new practitionerModel({
            name: req.body.name,
            country: req.body.country,
            email: req.body.email,
            region: req.body.region
        });

        practitioner.save();
        
        practitionerModel.find({}, function(err, docs){
            if(err) console.log('error in adminController.index', err);
            res.render('admin.jade', { 'practitioners': docs })
        });
    },
    readPractitioner: function(req, res){
        practitionerModel.find({}, function(err, docs){
            if(err) console.log('error in adminController.index', err);
            res.render('admin.jade', { 'practitioners': docs })
        });
    },
    deletePractitioner: function (req, res){
        practitionerModel.findOne({_id: req.body.id}, function(err, doc){
            if(err) console.log('error in adminController.index', err);
            //doc.remove();
            res.send(doc)
        });      
    }

}