var passport = require('passport');
var createSendToken = require('./services/auth/jwt');

module.exports = function(app) {

    var PATH = '/api/';

    //auth functions





    

    app.post(PATH + 'register', passport.authenticate('local-register', {
        failureFlash: false,
    }), function(req, res) {
        createSendToken(req.user, res);
    });

    app.post(PATH + 'login', passport.authenticate('local-login'), function(req, res) {
        createSendToken(req.user, res);
    });


    
    var Test = require('./controllers/test');
    app.get(PATH + 'test', Test.hello);


};
