
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var main = require('./controllers/mainController.js');
var admin = require('./controllers/adminController.js');
var mongoose = require('mongoose');

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
app.get('/admin', admin.readPractitioner);
app.post('/create-practitioner', admin.createPractitioner);
app.post('/delete-practitioner', admin.deletePractitioner);
/*************/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
