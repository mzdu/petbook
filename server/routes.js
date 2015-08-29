var passport = require('passport');

module.exports = function(app) {

    var PATH = '/api/';

    //auth functions




    var User = require('./controllers/user');
    
    var Test = require('./controllers/test');
    app.get(PATH + 'test', Test.hello);


};
