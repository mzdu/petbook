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


//allow cross origin requests
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, location, radius, asOfDate');

    next();
});



app.set('port', portNumber);



require('./routes')(app);


server.listen(app.get('port'), function() {
        console.log("Node app is running at localhost:" + app.get('port'))
});
