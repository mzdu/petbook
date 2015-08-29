var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function(user, res) {
    var payload = {
        sub: user.id,
        // exp: moment().add(30, 'minutes').unix()
        exp: moment().add(12, 'hours').unix()
    };

    var token = jwt.encode(payload, "shhh..");

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
};
