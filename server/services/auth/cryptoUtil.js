var crypt = require('crypto');
var moment = require('moment');
var jwt = require('jwt-simple');
var config = require('./cryptoUtil.config')();
var Hashids = require("hashids");
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');



exports.genuuid = function() {
    return crypt.randomBytes(48).toString('hex');
};

exports.validateToken = function(req) {
    var token = req.headers.authorization;
    // console.log('token is: ', token);
    if (!token) {
        console.log('token null');
        return null;
    }
    token = token.split(' ')[1];
    var payload = jwt.decode(token, 'shhh..');

    if (!payload.sub || !payload.exp) {
        console.log('null sub or exp');
        console.log('token null');
        return null;
    } else if (moment().isAfter(moment.unix(payload.exp))) {
        console.log('invalid timestamp');
        // console.log('exp is: ', new Date(payload.exp));
        return null;
    }
    console.log('token valid');
    return payload.sub;
};

exports.encrypt = function(obj) {
    var jsonObj = JSON.stringify(obj);
    var cipher = crypt.createCipher(config.algorithm, config.password);
    var crypted = cipher.update(jsonObj, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = function(obj) {
    var decipher = crypt.createDecipher(config.algorithm, config.password);
    var dec = decipher.update(obj, 'hex', 'utf8');
    dec += decipher.final('utf8');
    var result = JSON.parse(dec, this.dateReviver);
    return result;
};

exports.hashID = function(id){
    var hasher = new Hashids(config.password); //this is the salt
    var hashedID = hasher.encodeHex(id);
    return hashedID;
}

exports.deCodeID = function(hashedID){
    var hasher = new Hashids(config.password); //this is the salt
    var objectID = hasher.decodeHex(hashedID);
    return objectID;
}

exports.hashPassword = function(password){

    var deferred = Q.defer();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            deferred.reject(err);
        } else {
            bcrypt.hash(password, salt, null, function(err, hash) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(hash);
                }
            });
        }
    });

    return deferred.promise;

}



exports.dateReviver = function (key, value) {
    var a;
    if (typeof value === 'string') {
        a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
        if (a) {
            return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
        }
    }
    return value;
};
