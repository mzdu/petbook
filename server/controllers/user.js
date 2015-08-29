var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Status = mongoose.model('Status');

exports.getProfile = function(req, res) {
    var userID = req.params.userID;
    User.findOne({
            _id: userID
        },
        function(err, data) {
            if (err) {
                return utility.handleError(res, err);
            } else {
                return res.send(data);
            }
        });
}

exports.UpdateOrSavePetProfile = function(req, res) {
    var userID = req.params.userID;
    console.log('req.body is: ', req.body);
    var upsertData = {
        pet: req.body
    };

    var updateOptions = {
        upsertData: false,
        new: true
    };

    Status.findOneAndUpdate({
            _id: userID
        },
        upsertData,
        updateOptions,
        function(err, data) {
            if (err) {
                return utility.handleError(res, err);
            } else {
                return res.send(data);
            }
        });
}


exports.getMyPosts = function(req, res) {
    var userID = req.params.userID;

    Status.find({
            _Owner: userID
        },
        function(err, data) {
            if (err) {
                return utility.handleError(res, err);
            } else {
                return res.send(data);
            }
        });
}

exports.makeNewPost = function(req, res) {
    var userID = req.params.userID;

    //assigns the user as the donor
    var updateObj = req.body;
    updateObj._Owner = userID;
    Status.create(updateObj, function(err, results) {
        if (err) {
            return utility.handleError(res, err);
        } else {
            return res.send(results);
        }
    });
}


