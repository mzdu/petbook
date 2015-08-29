var mongoose = require('mongoose'),
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

    pet: PetSchema,

    createdDate: {
        type: Date,
        default: Date.now
    }
});

var PetSchema = new Schema({
    name: String,
    age: Number,
    breed: String,
    bio: String,
    sex: String,
    Status: StatusSchema
});

var StatusSchema = new Schema({
    details: String,
    likes: Number,
    bio: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});



mongoose.model('User', UserSchema);
