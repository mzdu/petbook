var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.getProfile = function (req, res){
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

    User.findOneAndUpdate({
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

