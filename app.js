
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');

/* controllers */
var main = require('./controllers/mainController.js');
var admin = require('./controllers/adminController.js');

/* plugins */
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
app.get('/admin', admin.login)
app.post('/login', admin.authenticate);
 
app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
}); 

app.get('/index', admin.index)

app.post('/read-practitioner', admin.readPractitioner);
app.post('/create-practitioner', admin.createPractitioner);
app.post('/delete-practitioner', admin.deletePractitioner);
app.post('/update-practitioner', admin.updatePractitioner);

app.post('/read-course', admin.readCourse);
app.post('/create-course', admin.createCourse);
app.post('/delete-course', admin.deleteCourse);
app.post('/update-course', admin.updateCourse);
/*************/


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
