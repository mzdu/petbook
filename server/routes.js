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


    var User = require('./controllers/user');
    //get entire user object profile
    app.get(PATH + 'pet/:userID', User.getProfile);
    //add or update pet profile
    app.post(PATH + 'pet/:userID', User.UpdateOrSavePetProfile);

    //get my posts (my wishes)
    // app.get(PATH + 'status/:userID', User.getMyPosts);

    // //make new post 
    // app.post(PATH + 'status/:userID', User.getMyPosts);

    //get other people's status updates (fulfill a wish)
    // app.post(PATH + 'status', User.getMoments);

};
