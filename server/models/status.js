var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatusSchema = new Schema({

    _Owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    details: String,
    likes: Number,
    bio: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    location: [Number]
});

mongoose.model('Status', StatusSchema);
