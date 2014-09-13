
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');

/* plugins */
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

/* controllers */
var main = require('./controllers/mainController.js');
var admin = require('./controllers/adminController.js');

/* models */
var userModel = require('./models/userModel.js');

/* Globals */
var MAX_LOGINS = 3;
var LOCKOUT_TIME = 0;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'supersecretsoftheuniverse'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  mongoose.connect('mongodb://localhost/ama-deus')
}

/*** nav ***/
app.get('/', main.index);
app.get('/home', main.home);
app.get('/about', main.about);
app.get('/courses', main.courses);
app.get('/info', main.info);
app.get('/contact', main.contact);
/************/

/*** admin ***/
app.get('/newuser', admin.newUser);
app.post('/createuser', admin.createUser);
app.post('/deleteuser', admin.deleteUser);

app.get('/admin', admin.login);

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/loginFailure',
    failureFlash: true
  })
);
 
app.get('/loginFailure', function(req, res, next) {
    console.log(next);
    res.redirect('/admin');    
});

app.get('images', function (req, res) {console.log('hi');res.redirect('/images')})
app.get('/index', admin.ensureAuthenticated, admin.index);
app.get('/logout', admin.ensureAuthenticated, admin.logout);

app.post('/read-practitioner', admin.ensureAuthenticated, admin.readPractitioner);
app.post('/create-practitioner', admin.ensureAuthenticated, admin.createPractitioner);
app.post('/delete-practitioner', admin.ensureAuthenticated, admin.deletePractitioner);
app.post('/update-practitioner', admin.ensureAuthenticated, admin.updatePractitioner);

app.post('/read-course', admin.ensureAuthenticated, admin.readCourse);
app.post('/create-course', admin.ensureAuthenticated, admin.createCourse);
app.post('/delete-course', admin.ensureAuthenticated, admin.deleteCourse);
app.post('/update-course', admin.ensureAuthenticated, admin.updateCourse);
/*************/

/***** passport functions *****/
passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
    // db connection
        userModel.findOne({
                'username': username    
            }, function (err, user) {

                if(user.loginAttempts <= MAX_LOGINS){
                  user.loginAttempts = ++user.loginAttempts;
                }else{
                  user.lockUntil = Date.now() + LOCKOUT_TIME;
                }

                user.save();

                // Auth Check Logic
                if(err) return done(err);
                if(!user) return done(null, false);
                if(user.lockUntil && user.lockUntil > Date.now()) return done(null, false);

                bcrypt.compare(password, user.password, function (err, isMatch) {
                  if(err) console.log(err);
                  if(isMatch){
                    user.loginAttempts = 0;
                    user.lockUntil = null;
                    user.save();
                    return done(null, user);
                  } 

                  return done(null, false)
                });
        });
    });
}));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
