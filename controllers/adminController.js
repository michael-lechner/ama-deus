var mongoose = require('mongoose');
var practitionerModel = require('../models/practitionerModel.js');
var courseModel = require('../models/courseModel.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/***** passport functions *****/


var admin = module.exports = {
    login: function (req, res){
            res.render('login.jade');
    },
    authenticate: function (req, res){
        passport.use(new LocalStrategy(function(username, password, done) {
            process.nextTick(function() {
                // Auth Check Logic
                return done(null, false);
            });
        }));

        passport.serializeUser(function(user, done) {
          done(null, user);
        });
 
        passport.deserializeUser(function(user, done) {
          done(null, user);
        });
        
        passport.authenticate('local', {
            successRedirect: res.redirect('/index'),
            failureRedirect: res.redirect('/loginFailure')
        })
    },
    index: function (req, res){
        // if(!req.user)
        practitionerModel.find({}, function(err, docs){
            console.log('user', req.user);
            if(err) console.log('error in adminController.index', err);
                res.render('adminMain.jade', { 'practitioners': docs })
        });

        // passport.authenticate('local', function (err, user, info) {
        //     // console.log('user', user);
        //     // if(!user) {return res.redirect('/admin')}
        
        //     // practitionerModel.find({}, function(err, docs){
        //     //     if(err) console.log('error in adminController.index', err);
        //     //     res.render('adminMain.jade', { 'practitioners': docs })
        //     // });                     
        // }); 
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
            res.render('admin-practitioner.jade', { 'practitioners': docs })
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
            doc.remove();
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
