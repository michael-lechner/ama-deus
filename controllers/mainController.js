var jade = require('jade')

var main = module.exports = {
    index: function(req, res){
        res.render('index.jade');
    },
    home: function (req, res) {
        jade.renderFile('./views/home.jade', {} ,function (err, html) {
            if(err) console.log(err);
            res.send(html);
        });
    },
    about: function (req, res) {
        jade.renderFile('./views/about.jade', {} ,function (err, html) {
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
    info: function (req, res) {
        jade.renderFile('./views/info.jade', {} ,function (err, html) {
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