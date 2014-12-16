var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamp = require('./../helpers/timestamp');

var MessageSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    userDisplayName: { type: String },
    userSocialNetworkId : { type: String },
    userSocialNetwork : { type: String, required: true },
    message : { type: String, required: true },
    country : { type : String },
    countryCode : { type : String },
    city : { type : String },
    ip : { type : String },
    location : {
        type : { type: String, default: 'Point'},
        coordinates : { type: [Number] }
    },
    receivedBy : [{ type: Schema.ObjectId, ref: 'User' }]
});

MessageSchema.index({ "location" : "2dsphere"});

MessageSchema.index({ "created" : -1});


MessageSchema.plugin(timestamp, { useVirtual: false });

module.exports = Message = mongoose.model('Message', MessageSchema);