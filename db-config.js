var mongoose = require('mongoose');

module.exports = {
    connect: function () {
        if ('production' == process.env.NODE_ENV) {
            mongoose.connect(process.env.MONGOHQ_URL);
        }else{
            mongoose.connect('mongodb://localhost/ama-deus/avy-rose');
        }
    }
}