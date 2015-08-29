var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    cryptoUtil = require('../services/auth/cryptoUtil'),
    Schema = mongoose.Schema;




var UserSchema = new Schema({
    username: {
        type: String
    },


    email: {
        type: String,
        unique: true,
        required: true,
    },

    firstName: String,

    lastName: String,

    password: {
        type: String,
        required: true,
    },

    phone: String,

    pet: {
        name: String,
        age: Number,
        breed: String,
        bio: String,
        sex: String,
        photoUrl: String,
        createdDate: {
            type: Date,
            default: Date.now
        }
    },

    createdDate: {
        type: Date,
        default: Date.now
    }
});



UserSchema.methods.toJSON = function() {
    var user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.methods.comparePasswords = function(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified()) return next();

    cryptoUtil.hashPassword(user.password).then(function(data, err) {
        if (err) {
            return next(err);
        } else {
            user.password = data;
            next();
        }
    });
});



mongoose.model('User', UserSchema);
