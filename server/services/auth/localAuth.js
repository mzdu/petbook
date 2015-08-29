var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var cryptoUtil = require('./cryptoUtil');

var strategyOptions = {
    usernameField: 'username',
    passReqToCallback: true
};

exports.login = new LocalStrategy(strategyOptions, function(req, username, password, done) {

    var searchUser = {
        username: username
    };

    User.findOne(searchUser, function(err, user) {
        if (err) return done(err);

        if (!user) return done(null, false, {
            message: 'Wrong username/password'
        });

        user.comparePasswords(password, function(err, isMatch) {
            if (err) return done(err);

            if (!isMatch) return done(null, false, {
                message: 'Wrong username/password'
            });

            return done(null, user);
        });
    })
});

exports.register = new LocalStrategy(strategyOptions, function(req, userName, password, done) {
    console.log('in register');
    var searchUser = {
        email: req.body.email
    };

    var searchUser2 = {
        username: userName
    };

    //verify email is unique
    User.findOne(searchUser, function(err, user) {
        if (err) {
            handleError(err);
            return done(err);
        }

        if (user) {
            // console.log('user already exists!');
            return done(null, false, {
                message: 'email already exists'
            });
        }

        //verify user name is unique
        User.findOne(searchUser2, function(err, user2) {
            if (err) {
                handleError(err);
                return done(err);
            }

            if (user2) {
                // console.log('user already exists!');
                return done(null, false, {
                    message: 'user name already exists'
                });
            }

            var newUser = new User({
                username: userName,
                email: req.body.email,
                password: password
            });

            console.log('created new user');

            newUser.save(function(err, dbUser) {
                if (err) {
                    handleError(err);
                    return done(err);
                }

                done(null, newUser);
            }); //end of save
        }); //end of find one


    });
});

function handleError(msg) {
    console.log('the err is: ', msg);
}
