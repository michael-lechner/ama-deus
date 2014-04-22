var jade = require('jade')

var main = module.exports = {
    index: function(req, res){
        res.render('index.jade');
    },
    courses: function (req, res) {
        jade.renderFile('./views/courses.jade', {} ,function (err, html) {
            if(err) console.log(err);
            res.send(html);
        });
    }

}