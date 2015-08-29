var mongoose = require('mongoose'),
    // jwt = require('jsonwebtoken'),
    User = mongoose.model('User'),
    passport = require('passport'),
    cryptoUtil = require('../services/auth/cryptoUtil'),
    bcrypt = require('bcrypt-nodejs');

//this method is no longer in use. 
//See /services/auth/localAuth instead
exports.Register = function(req, res) {
        // res.setHeader('Access-Control-Allow-Origin','*');
        console.log('in signup');
        console.log('req body is: ', req.body);
        User.create(req.body, function(err, results) {
            if (err) {
                return console.log(err);
            } else {
                return res.send(201, results);
            }

        });
    } //end of sign up

//this method is no longer in use. 
//See /services/auth/localAuth instead
exports.Login = function(req, res) {

    userName = req.body.username;

    User.findOne({
        username: userName
    }, function(err, data) {

        if (err) {
            console.log('err is: ', err);
            return res.send(err);
        } else {
            userPass = req.body.password;
            if (data != null && data.password == userPass) {
                return res.send(200, {
                    result: 'true'
                });
            } else {
                return res.send(200, {
                    result: 'false'
                });
            }

        }
    });

}; //end of login



};
