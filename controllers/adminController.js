var mongoose = require('mongoose');
var practitionerModel = require('../models/practitionerModel.js');
var courseModel = require('../models/courseModel.js');

var admin = module.exports = {
    createPractitioner: function (req, res){
        var practitioner = new practitionerModel({
            name: req.body.data.name,
            country: req.body.data.country,
            email: req.body.data.email,
            region: req.body.data.region
        });

        practitioner.save(function () {
            practitionerModel.find({}, function(err, docs){
                if(err) console.log('error in adminController.index', err);
                res.render('partials/table-partial.jade', { 'practitioners': docs })
            });
        });
    },
    readPractitioner: function(req, res){
        practitionerModel.find({}, function(err, docs){
            if(err) console.log('error in adminController.index', err);
            res.render('admin.jade', { 'practitioners': docs })
        });
    },
    updatePractitioner: function (req, res){
        /***** TODO: MJL******/
        /* construct data in ajax call
         * send doc id
         * decide wether to replace whole table
         */
    },
    deletePractitioner: function (req, res){
        practitionerModel.findOne({_id: req.body.id}, function(err, doc){
            if(err) console.log('error in adminController.index', err);
            doc.remove();
            res.send(doc)
        });      
    }

}