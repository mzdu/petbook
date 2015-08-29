var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var passport = require('passport');
var morgan = require('morgan');


var mongoUri = 'mongodb://v3user:test123@ds035563.mongolab.com:35563/v3-dev';

mongoose.connect(mongoUri);
var db = mongoose.connection;

db.on('error', function() {
    throw new Error('unable to connect to database at ' + mongoUri);
});

var app = express();
var server = require('http').createServer(app);

var portNumber = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(morgan('combined'));

app.use(passport.initialize());

//allow cross origin requests
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, location, radius, asOfDate');

    next();
});


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

require('./models/user');
require('./models/status');


var localStrategy = require('./services/auth/localAuth');
passport.use('local-register', localStrategy.register);
passport.use('local-login', localStrategy.login);


app.set('port', portNumber);



require('./routes')(app);


server.listen(app.get('port'), function() {
        console.log("Node app is running at localhost:" + app.get('port'))
});
