var passport = require('passport');

module.exports = function(app) {

    var PATH = '/api/';

    //auth functions




    // var User = require('./controllers/user');
    // app.get(PATH + 'user/auth', User.getUserID); //return the userID based on access token - testing only

    var Test = require('./controllers/test');
    app.get(PATH + 'test', Test.hello);


};
