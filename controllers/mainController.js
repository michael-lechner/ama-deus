var jade = require('jade')

var main = module.exports = {
    index: function(req, res){
        res.render('index.jade');
    },
    about: function (req, res) {
        jade.renderFile('./views/about.jade', {} ,function (err, html) {
            if(err) console.log(err);
            res.send(html);
        });
    },
    people: function (req, res){
        jade.renderFile('./views/people.jade', {} ,function (err, html) {
            if(err) console.log(err);
            res.send(html);
        });
    },
    courses: function (req, res) {
        jade.renderFile('./views/courses.jade', {} ,function (err, html) {
            if(err) console.log(err);
            res.send(html);
        });
    },
    press: function (req, res) {
        jade.renderFile('./views/press.jade', {} ,function (err, html) {
            if(err) console.log(err);
            res.send(html);
        });
    },
    contact: function (req, res) {
        jade.renderFile('./views/contact.jade', {} ,function (err, html) {
            if(err) console.log(err);
            res.send(html);
        });
    }
}