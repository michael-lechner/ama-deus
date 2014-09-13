var mongoose = require('mongoose');
var practitionerModel = require('../models/practitionerModel.js');
var courseModel = require('../models/courseModel.js');
var userModel = require('../models/userModel.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var admin = module.exports = {
    newUser : function (req, res){
        userModel.find({}, function(err, docs){
            if(err) console.log('error in adminController.index', err);
            res.render('admin-new-user.jade', { 'users': docs })
        });
    },
    createUser: function (req, res){
        var user = new userModel({
            username: req.body.username,
            password: req.body.password
        });

        user.save(function () {
            res.redirect('/newuser');
        });

    },
    deleteUser: function (req, res){
        userModel.findOne({_id: req.body.id}, function(err, doc){
            if(err) console.log('error in adminController.index', err);
            doc.remove();
            res.send(doc)
        });      
    }, 
    login: function (req, res){
        res.render('login.jade');
    },
    logout: function (req, res){
        req.logout();
        res.redirect('/admin');
    },
    index: function (req, res){
        practitionerModel.find({}, function(err, docs){
            if(err) console.log('error in adminController.index', err);
                res.render('admin-practitioner.jade', { 'practitioners': docs })
        });
    }, 
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }else{
            res.redirect('/loginFailure');
        }
    },
    /*************** practitioners ****************/
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
                res.render('partials/practitioner-table-partial.jade', { 'practitioners': docs })
            });
        });
    },
    readPractitioner: function(req, res){
        practitionerModel.find({}, function(err, docs){
            if(err) console.log('error in adminController.index', err);
            res.render('partials/admin-practitioner-partial.jade', { 'practitioners': docs })
        });
    },
    updatePractitioner: function (req, res){
        console.log(req.body);

        practitionerModel.findOneAndUpdate(
            { _id: req.body.id },
            {
                name: req.body.data.name,
                country: req.body.data.country,
                email: req.body.data.email,
                region: req.body.data.region
            },
            function(err, doc) {
                if(err) console.log('error in adminController.update', err);
                res.send({success: 'true'})
            }
        );
    },
    deletePractitioner: function (req, res){
        practitionerModel.findOne({_id: req.body.id}, function(err, doc){
            if(err) console.log('error in adminController.index', err);
            if(doc) doc.remove();
            res.send(doc)
        });      
    },

    /*************** courses ****************/
    createCourse: function (req, res){
        console.log('create course not implemented yet');        
    },
    readCourse: function (req, res){
        res.render('admin-course.jade');
    },
    updateCourse: function (req, res){
        console.log('update course not implemented yet');
    },
    deleteCourse: function (req, res){
        console.log('delete course not implemented yet');
    }
}
